   @echo off
for /f "tokens=1-4 delims=/ " %%a IN ('DATE /T') do (set MYDATE=%%a-%%b-%%c-%%d%)
for /f "tokens=1-2 delims=: " %%a in ('TIME /T') do (set MYTIME=%%ah%%bm)

COLOR 0a
cd C:/xampp/mysql/bin

mysqldump -uBackupserver -p123 redemrp > C:\Users\Administrador\Desktop\backupdatabase\backup" "%mydate%%mytime%.sql