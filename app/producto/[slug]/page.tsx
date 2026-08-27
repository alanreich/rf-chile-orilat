import Link from "next/link";

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

const DECLARACION =
  "El equipo previamente individualizado cumple con las disposiciones establecidas en la Norma Técnica de Equipos de alcance reducido, aprobada por la resolución exenta N° 1.985, de 2017, de la Subsecretaría de Telecomunicaciones.";

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

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let producto: Producto | undefined;

  try {
    const productos = await obtenerProductos();

    producto = productos.find(
      (item) => String(item.slug).toLowerCase() === slug.toLowerCase()
    );
  } catch {
    producto = undefined;
  }

  if (!producto) {
    return (
      <main className="productPage">
        <header className="header">
          <div className="brand">ORILAT</div>
          <div className="country">CHILE</div>
        </header>

        <div className="productWrapper">
          <Link href="/" className="backLink">
            ← Volver al buscador
          </Link>

          <div className="empty">
            <h1>Equipo no encontrado</h1>
            <p>No pudimos encontrar la información del equipo solicitado.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="productPage">
      <header className="header">
        <div className="brand">ORILAT</div>
        <div className="country">CHILE</div>
      </header>

      <div className="productWrapper">
        <Link href="/" className="backLink">
          ← Volver al buscador
        </Link>

        <section className="productHeader">
          <p className="eyebrow">EQUIPO DE RADIOFRECUENCIA</p>

          <h1>{producto.nombre}</h1>

          <div className="productIdentity">
            <span>
              <strong>Marca</strong>
              {producto.marca || "-"}
            </span>

            <span>
              <strong>Modelo</strong>
              {producto.modelo || "-"}
            </span>

            <span>
              <strong>Código</strong>
              {producto.codigo || "-"}
            </span>
          </div>
        </section>

        <section className="infoSection">
          <h2>A. Información Comercial</h2>

          <div className="infoCard">
            <div className="infoRow">
              <span>Fecha de publicación</span>
              <strong>{producto.fecha_publicacion || "-"}</strong>
            </div>

            <div className="infoRow">
              <span>Nombre comercial del equipo</span>
              <strong>{producto.nombre || "-"}</strong>
            </div>

            <div className="infoRow">
              <span>Fabricante</span>
              <strong>{producto.fabricante || "-"}</strong>
            </div>

            <div className="infoRow">
              <span>Importador o representante en Chile</span>
              <strong>{producto.importador || "-"}</strong>
            </div>

            <div className="infoRow">
              <span>Domicilio</span>
              <strong>{producto.domicilio_importador || "-"}</strong>
            </div>

            <div className="infoRow">
              <span>Correo electrónico de contacto</span>
              <strong>{producto.email_importador || "-"}</strong>
            </div>

            <div className="infoRow">
              <span>Sitio web</span>
              <strong>{producto.web_importador || "-"}</strong>
            </div>
          </div>
        </section>

        <section className="infoSection">
          <h2>B. Características Técnicas</h2>

          <div className="infoCard">
            <div className="infoRow">
              <span>Tipo de equipo</span>
              <strong>{producto.tipo_equipo || "-"}</strong>
            </div>

            <div className="infoRow">
              <span>Marca</span>
              <strong>{producto.marca || "-"}</strong>
            </div>

            <div className="infoRow">
              <span>Modelo</span>
              <strong>{producto.modelo || "-"}</strong>
            </div>

            <div className="infoRow">
              <span>Tecnología o modulación</span>
              <strong>{producto.tecnologia_modulacion || "-"}</strong>
            </div>

            <div className="infoRow">
              <span>Frecuencia(s)</span>
              <strong>{producto.bandas_frecuencia || "-"}</strong>
            </div>

            <div className="infoRow">
              <span>Ganancia de antena (dBi)</span>
              <strong>{producto.ganancia_antena || "-"}</strong>
            </div>

            <div className="infoRow">
              <span>P.I.R.E. máxima medida</span>
              <strong>{producto.pire || "-"}</strong>
            </div>

            <div className="infoRow">
              <span>Módulos</span>
              <strong>{producto.modulos || "-"}</strong>
            </div>
          </div>
        </section>

        <section className="infoSection">
          <h2>Informe de Ensayo (Test Report)</h2>

          <div className="reportCard">
            {producto.test_report_url && producto.test_report_nombre ? (
              <a
                href={producto.test_report_url}
                target="_blank"
                rel="noopener noreferrer"
                className="reportFileLink"
              >
                {producto.test_report_nombre}
              </a>
            ) : (
              <span>-</span>
            )}
          </div>
        </section>

        <section className="infoSection">
          <h2>C. Declaración de Conformidad</h2>

          <div className="declaration">
            <p>{DECLARACION}</p>
          </div>
        </section>
      </div>

      <footer>
        Información técnica y documentación de equipos de radiofrecuencia
        comercializados en Chile.
      </footer>
    </main>
  );
}
