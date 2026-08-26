"use client";

import { useEffect, useMemo, useState } from "react";

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
  frecuencia: string;
  ganancia_antena: string;
  pire: string;
  modulos: string;
  declaracion_conformidad: string;
  test_report_nombre: string;
  test_report_url: string;
  fecha_publicacion: string;
  publicar: string;
  slug: string;
};

const API_URL =
  "https://script.google.com/macros/s/AKfycbxkBc2B7i38YNBITxWXlSzelgsl5rIicd_NlxIw99eArSMrd2is3ENIt-AzgDf7RAg1/exec";

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarProductos() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("No se pudo consultar la información.");
        }

        const data = await response.json();
        setProductos(data.productos || []);
      } catch {
        setError(
          "No pudimos cargar la información. Por favor, intentá nuevamente."
        );
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  const resultados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    if (!texto) return [];

    return productos.filter((producto) => {
      const contenido = [
        producto.codigo,
        producto.nombre,
        producto.marca,
        producto.modelo,
        producto.tipo_equipo,
      ]
        .join(" ")
        .toLowerCase();

      return contenido.includes(texto);
    });
  }, [busqueda, productos]);

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
          Buscá un producto por modelo, marca, nombre o código para consultar
          su información técnica y documentación de conformidad.
        </p>

        <div className="searchBox">
          <span className="searchIcon">⌕</span>

          <input
            type="search"
            placeholder="Ej: RF-001"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            aria-label="Buscar producto"
          />
        </div>

        <p className="help">
          Podés ingresar el modelo completo o solamente una parte.
        </p>
      </section>

      <section className="results">
        {cargando && <p className="status">Cargando productos...</p>}

        {error && <p className="error">{error}</p>}

        {!cargando && !error && busqueda && resultados.length === 0 && (
          <div className="empty">
            <h2>No encontramos ese equipo</h2>
            <p>Verificá el modelo o intentá buscar por marca o código.</p>
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
        Información regulatoria de productos con radiofrecuencia comercializados
        en Chile.
      </footer>
    </main>
  );
}
