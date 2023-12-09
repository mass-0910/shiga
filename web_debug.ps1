Push-Location build_web/dest

$serverJob = Start-Job -ScriptBlock { python -m http.server 8080 }

Start-Sleep 0.3

Start-Process "http://localhost:8080/main.html"

try {
    Get-Job | Wait-Job | Out-Null
} finally {
    Write-Host "finish"
    Stop-Job $serverJob
    Pop-Location
}
