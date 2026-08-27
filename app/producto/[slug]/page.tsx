import BuscadorProductos from "./BuscadorProductos";

type Producto = {
  codigo: string;
  nombre: string;
  marca: string;
  modelo: string;
  tipo_equipo: string;
  fabricante: string;
  importador: string;
  domicilio_importador: string;
  email_importador: string;
  web_importador: string;
  tecnologia_modulacion: string;
  bandas_frecuencia: string;
  ganancia_antena: string;
  pire: string;
  modulos: string;
  test_report_nombre: string;
  test_report_url: string;
  fecha_publicacion: string;
  publicar: string;
  slug: string;
};

const API_URL =
  "https://script.google.com/macros/s/AKfycbxkBc2B7i38YNBITxWXlSzelgsl5rIicd_NlxIw99eArSMrd2is3ENIt-AzgDf7RAg1/exec";

async function obtenerProductos(): Promise<Producto[]> {
  const response = await fetch(API_URL, {
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo consultar la información.");
  }

  const data = await response.json();

  return data.productos || [];
}

export default async function Home() {
  let productos: Producto[] = [];
  let error = "";

  try {
    productos = await obtenerProductos();
  } catch {
    error =
      "No pudimos cargar la información. Por favor, intentá nuevamente.";
  }

  return (
    <main className="container">
      <header className="header">
        <div className="brand">ORILAT</div>
        <div className="country">CHILE</div>
      </header>

      {error ? (
        <>
          <section className="hero">
            <p className="eyebrow">RADIOFRECUENCIA</p>
            <h1>Consulta de equipos</h1>
          </section>

          <section className="results">
            <p className="error">{error}</p>
          </section>
        </>
      ) : (
        <BuscadorProductos productos={productos} />
      )}

      <footer>
        Información técnica y documentación de equipos de radiofrecuencia
        comercializados en Chile.
      </footer>
    </main>
  );
}
