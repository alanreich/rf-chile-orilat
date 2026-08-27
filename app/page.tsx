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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  let productos: Producto[] = [];
  let error = "";

  try {
    productos = await obtenerProductos();
  } catch {
    error =
      "No pudimos cargar la información. Por favor, intentá nuevamente.";
  }

  const params = await searchParams;
  const busqueda = (params.q || "").trim();
  const texto = busqueda.toLowerCase();

  const resultados = texto
    ? productos.filter((producto) => {
        const contenido = [
          producto.codigo,
          producto.nombre,
          producto.marca,
          producto.modelo,
          producto.tipo_equipo,
          producto.tecnologia_modulacion,
          producto.bandas_frecuencia,
          producto.pire,
          producto.modulos,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return contenido.includes(texto);
      })
    : [];

  return (
    <main className="container">
      <header className="header">
        <div className="brand">ORILAT</div>
        <div className="country">CHILE</div>
      </header>

      <section className="hero">
        <p className="eyebrow">RADIOFRECUENCIA</p>

        <h1>Consulta de equipos</h1>

        <p className="intro">
          Buscá un equipo por nombre, marca, modelo, tipo o características
          técnicas para consultar su información y documentación.
        </p>

        <form className="searchBox" method="GET">
          <span className="searchIcon">⌕</span>

          <input
            type="search"
            name="q"
            placeholder="Ej: RF-001"
            defaultValue={busqueda}
            aria-label="Buscar equipo"
          />
        </form>

        <p className="help">
          Podés ingresar el modelo completo o solamente una parte.
        </p>
      </section>

      <section className="results">
        {error && <p className="error">{error}</p>}

        {!error && busqueda && resultados.length === 0 && (
          <div className="empty">
            <h2>No encontramos ese equipo</h2>
            <p>
              Verificá el dato ingresado o intentá buscar por nombre, marca,
              modelo o característica técnica.
            </p>
          </div>
        )}

        {resultados.map((producto) => (
          <article className="productCard" key={producto.codigo}>
            <div>
              <span className="tag">{producto.tipo_equipo}</span>

              <h2>{producto.nombre}</h2>

              <div className="productInfo">
                <span>
                  <strong>Marca:</strong> {producto.marca}
                </span>

                <span>
                  <strong>Modelo:</strong> {producto.modelo}
                </span>

                <span>
                  <strong>Código:</strong> {producto.codigo}
                </span>
              </div>
            </div>

            <a
              className="button"
              href={`/producto/${encodeURIComponent(producto.slug)}`}
            >
              Ver información
            </a>
          </article>
        ))}
      </section>

      <footer>
        Información técnica y documentación de equipos de radiofrecuencia
        comercializados en Chile.
      </footer>
    </main>
  );
}
