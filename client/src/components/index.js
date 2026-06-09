const componentFiles = import.meta.glob("./*.jsx", { eager: true }); // Gets all files in folder
const components = {};

for (const path in componentFiles) {
  const fileName = path.split("/").pop(); // Strips ./Input.jsx down to Input.jsx

  if (fileName === "index.js") continue;

  const name = fileName.replace(".jsx", "");
  components[name] = componentFiles[path].default;
}

export default components;