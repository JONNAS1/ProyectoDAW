# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# **Bienvenido a nuestro proyecto de DAW 2**

# **Autores: Ximo y Joan

---

##  **Descripción del Proyecto**

Este proyecto se desarrolla como parte de la asignatura de **Desarrollo de Aplicaciones Web (DAW)**, donde aplicaremos nuestros conocimientos de las asignasturas y las abocaremos en nuestro Proyecto personal.

El objetivo principal es seguir utilizando este proyecto para mostrar y obtener más conocimiento en el mundo del la infomrática.

##  **Tecnologías Utilizadas**

La pila tecnológica utilizada para este proyecto es la siguiente:

* **Frontend:**
    * HTML
    * CSS
* **Backend:**
    * JAVASCRIPT
    * PHP
* **Base de Datos:**
    * MariaDB
* **Contenedor(al final depende del hosting)**
    * Docker
* **FrameWork:**
    * React

### **1. Prerrequisitos**

Asegúrate de tener instalado lo siguiente:

* ..

## **Comandos para github:**

### **Clonar el Repositorio**

```
cd (carpeta donde quieras guardarlo)
git clone https://github.com/xmmpro/PIM-
```

### **Añade todos los archivos modificados al área de staging (preparación) para el commit.**
```
git add .
```

### **2. Hacer commit**
```
git commit -m "cambio readme"
```

### **Muestra una lista de las ramas. La rama actual se marca con un * **
```
git branch
```


### **2. Hacer commit**
```
git branch
```

### **Con esto creamos una rama llamada segunda.**
```
git branch segunda
```
### **Cambia tu espacio de trabajo local (tu copia) a la rama segunda. Ahora, los cambios que hagas se registrarán solo en esta rama.**
```
git checkout segunda
```

### Sube tu rama local (segunda) al repositorio remoto (origin).
git push -u origin segunda

###

# 💻 Flujo de Trabajo con Git y Visual Studio Code

---

## 🟩 2. Primer Paso al llegar a Visual Studio Code

Cada vez que vayas a trabajar en el repositorio:

1.  **Abre el terminal integrado en VS Code**
    > Terminal → New Terminal

2.  **Muévete a tu carpeta del proyecto (si no estás ya dentro)**
    ```bash
    cd nombre-de-tu-carpeta
    ```

3.  **Comprueba en qué rama estás**
    ```bash
    git branch
    ```
    La rama con `*` es la **activa**.

4.  **Actualiza tu copia con lo último de GitHub**
    (Si todos trabajáis en la misma rama)

    ```bash
    git pull
    ```
    O especificando la rama:

    ```bash
    git pull origin main
    ```

---

## 🟧 3. Crear o Descargar Ramas

* **Listar ramas existentes**
    ```bash
    git branch
    git branch -a # también muestra ramas remotas
    ```

* **Crear una rama nueva**
    ```bash
    git checkout -b nombre-rama
    ```

* **Subir tu rama nueva al repositorio remoto**
    ```bash
    git push -u origin nombre-rama
    ```

* **Cambiar entre ramas**
    ```bash
    git checkout main
    git checkout segunda
    ```

---

## 🟨 4. Qué hacer mientras trabajas (Ciclo de trabajo diario)

Cuando edites cualquier archivo (como `index.html`, `README.md`, CSS, etc.):

1.  **Ver qué ha cambiado**
    ```bash
    git status
    ```

2.  **Añadir tus cambios al *staging***
    ```bash
    git add .
    ```

3.  **Crear el *commit***
    ```bash
    git commit -m "Descripción clara de lo que se ha hecho"
    ```

4.  **Subir los cambios a GitHub**
    ```bash
    git push
    ```

---

## 🟪 5. Fusionar Ramas (**Merge**)

Supongamos que quieres fusionar la rama `segunda` dentro de `main`.

1.  **Cambiar a la rama destino (`main`)**
    ```bash
    git checkout main
    ```

2.  **Actualizar la rama `main` antes de fusionar**
    ```bash
    git pull
    ```

3.  **Hacer el *merge***
    ```bash
    git merge segunda
    ```

4.  **Subir la fusión a GitHub**
    ```bash
    git push
    ```

5.  **Comprobar que la fusión ha sido correcta**
    ```bash
    git branch --merged
    ```

---

## 🟥 6. Descargar los Cambios de tu Compañero

Si tu compañero ha subido cambios:

1.  **Cambia a la rama donde están los cambios**
    ```bash
    git checkout main
    # o
    git checkout segunda
    ```

2.  **Descarga sus cambios**
    ```bash
    git pull
    ```
    Ahora VS Code mostrará sus actualizaciones.

---

## 🟫 7. Comandos Útiles Adicionales

* **Ver historial de commits**
    ```bash
    git log --oneline
    ```

* **Ver qué archivo cambió exactamente**
    ```bash
    git diff
    ```

* **Borrar una rama local**
    ```bash
    git branch -d nombre-rama
    ```

* **Borrar una rama remota**
    ```bash
    git push origin --delete nombre-rama
    ```

---

## 🟦 8. Clonar un Repositorio por Primera Vez

```bash
cd carpeta-de-destino
git clone [https://github.com/xmmpro/PIM-.git](https://github.com/xmmpro/PIM-.git)
cd PIM-
