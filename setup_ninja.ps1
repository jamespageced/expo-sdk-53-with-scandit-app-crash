#Pre-condition - "plugins" folder must exist in same directory as this script

# Variables
$ninjaZipUri = "https://github.com/ninja-build/ninja/releases/download/v1.13.2/ninja-win.zip"
$ninjaZipOutputFile = "ninja-win.zip"
$ninjaZipOutputPathWithFile = "$PWD" + "\" + $ninjaZipOutputFile
$ninjaExeOutputPath = "$PWD" + "\plugins\ninja-win"

# Create folder in root directory
mkdir $ninjaExeOutputPath

# Download ninja zip
Invoke-WebRequest -Uri $ninjaZipUri -OutFile $ninjaZipOutputPathWithFile

# Unzip zip-file to the folder in plugins
Expand-Archive -Path $ninjaZipOutputPathWithFile -DestinationPath $ninjaExeOutputPath

# Remove zip-file
Remove-Item -Path $ninjaZipOutputPathWithFile