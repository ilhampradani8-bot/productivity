#!/bin/bash
set -e

BUILD_TOOLS="/opt/android-sdk/build-tools/android-13"
PLATFORM="/opt/android-sdk/platforms/android-11/android.jar"
PROJECT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BIN="$PROJECT/bin"
SRC="$PROJECT/src/me/ilhampradani/productivity/alarm"

mkdir -p "$BIN/obj" "$BIN/res"

echo "=== 1. Compile Resources with AAPT2 ==="
$BUILD_TOOLS/aapt2 compile --dir "$PROJECT/res" -o "$BIN/res/resources.zip"
$BUILD_TOOLS/aapt2 link --manifest "$PROJECT/AndroidManifest.xml" \
  -I "$PLATFORM" \
  "$BIN/res/resources.zip" \
  -o "$BIN/unaligned.apk" \
  --java "$PROJECT/src" \
  --auto-add-overlay

echo "=== 2. Compile Java Classes with javac ==="
javac -encoding UTF-8 \
  -cp "$PLATFORM" \
  -d "$BIN/obj" \
  "$SRC"/*.java "$PROJECT/src/me/ilhampradani/productivity/alarm/R.java"

echo "=== 3. Convert Classes to DEX with D8 ==="
# Find all class files in obj
$BUILD_TOOLS/d8 $(find "$BIN/obj" -name "*.class") \
  --lib "$PLATFORM" \
  --output "$BIN" \
  --min-api 21

echo "=== 4. Add classes.dex to APK ==="
cd "$BIN"
python3 -c "
import zipfile
with zipfile.ZipFile('$BIN/unaligned.apk', 'a') as apk:
    apk.write('$BIN/classes.dex', 'classes.dex')
"

echo "=== 5. Zipalign APK ==="
rm -f "$BIN/aligned.apk"
$BUILD_TOOLS/zipalign -f -v 4 "$BIN/unaligned.apk" "$BIN/aligned.apk"

echo "=== 6. Generate Keystore if needed ==="
if [ ! -f "$PROJECT/debug.keystore" ]; then
  keytool -genkey -v -keystore "$PROJECT/debug.keystore" \
    -alias aura_key -keyalg RSA -keysize 2048 -validity 10000 \
    -storepass auradesk123 -keypass auradesk123 \
    -dname "CN=AuraDesk, OU=Dev, O=IlhamPradani, L=Jakarta, ST=Jakarta, C=ID"
fi

echo "=== 7. Sign APK ==="
rm -f "$BIN/AuraDeskAlarm.apk"
$BUILD_TOOLS/apksigner sign --ks "$PROJECT/debug.keystore" \
  --ks-pass pass:auradesk123 \
  --key-pass pass:auradesk123 \
  --out "$BIN/AuraDeskAlarm.apk" \
  "$BIN/aligned.apk"

echo "=== BUILD COMPLETE! ==="
ls -lh "$BIN/AuraDeskAlarm.apk"
