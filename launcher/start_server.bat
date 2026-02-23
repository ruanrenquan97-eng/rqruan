@echo off
cd /d "%~dp0.."
start "AI System Server" cmd /k "npm run dev"
