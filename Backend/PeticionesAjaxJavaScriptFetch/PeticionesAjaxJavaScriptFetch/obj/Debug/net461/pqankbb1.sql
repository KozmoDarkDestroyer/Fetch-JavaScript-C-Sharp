IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

CREATE TABLE [Estudiante] (
    [id_estudiante] int NOT NULL IDENTITY,
    [nombre_completo] nvarchar(65) NOT NULL,
    [identificacion] nvarchar(450) NOT NULL,
    [carrera] nvarchar(65) NOT NULL,
    [semestre] int NOT NULL,
    CONSTRAINT [PK_Estudiante] PRIMARY KEY ([id_estudiante])
);

GO

CREATE UNIQUE INDEX [IX_Estudiante_identificacion] ON [Estudiante] ([identificacion]);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20190613022552_EstudianteAjax', N'2.2.4-servicing-10062');

GO

