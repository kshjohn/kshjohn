@echo off
rem Windows: 이 파일을 더블클릭하면 로컬 서버가 켜지고 브라우저가 열립니다.
cd /d "%~dp0.."
where python >nul 2>nul || (echo python 이 없습니다. https://www.python.org/downloads/ 에서 설치한 뒤 다시 여세요. & pause & exit /b 1)
python local\serve.py
