# リソースリスト生成
$resourceListPath = "src/web_conf/resourceList.json"
Push-Location res
$resourceFiles = Get-ChildItem -Path . -Recurse -ErrorAction SilentlyContinue -Name | Where-Object { Test-Path -PathType leaf $_ }
Pop-Location
$resourceFiles = $resourceFiles | ForEach-Object { ("res/" + $_) -replace "\\", "/" }
ConvertTo-Json $resourceFiles | Out-File -FilePath $resourceListPath
Write-Host "resource list has output to '$resourceListPath'"

# プログラムビルド
cmake -S . -B build_web -G Ninja "-DCMAKE_TOOLCHAIN_FILE=$($env:EMSDK)/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake"
cmake --build build_web --target clean
cmake --build build_web -j 14