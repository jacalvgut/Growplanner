' Script VBScript para ejecutar start-app.bat de forma silenciosa
' Este script oculta la ventana de consola y ejecuta el batch

Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' Obtener la ruta del proyecto (un nivel arriba desde scripts/)
scriptPath = fso.GetParentFolderName(WScript.ScriptFullName)
batchPath = scriptPath & "\scripts\start-app.bat"

' Verificar que el archivo batch existe
If Not fso.FileExists(batchPath) Then
    MsgBox "Error: No se encontró el archivo start-app.bat en:" & vbCrLf & batchPath, vbCritical, "GrowPlanner"
    WScript.Quit
End If

' Ejecutar el batch (sin mostrar ventana de consola inicial)
WshShell.Run """" & batchPath & """", 0, False

