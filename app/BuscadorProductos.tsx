"use client";

import { useMemo, useState } from "react";

type Producto = {
  nombre: string;
  marca: string;
  modelo: string;
  tipo_equipo: string;
  tecnologia_modulacion: string;
  bandas_frecuencia: string;
  pire: string;
  modulos: string;
  slug: string;
};

export default function BuscadorProductos({
  productos,
}: {
  productos: Producto[];
}) {
  const [busqueda, setBusqueda] = useState("");

  const resultados = useMemo(() => {

    const texto = busqueda
      .trim()
      .toLowerCase();

    if (!texto) {
      return [];
    }

    return productos.filter((producto) => {

      const contenido = [
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

    });

  }, [busqueda, productos]);


  return (
    <>
      <section className="hero">

        <p className="eyebrow">
          RADIOFRECUENCIA
        </p>

        <h1>
          Consulta de equipos
        </h1>

        <p className="intro">
          Buscá un equipo por nombre, marca, modelo, tipo o características
          técnicas para consultar su información y documentación.
        </p>

        <div className="searchBox">

          <span className="searchIcon">
            ⌕
          </span>

          <input
            type="search"
            placeholder="Ej: RF-001"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            aria-label="Buscar equipo"
            autoComplete="off"
          />

        </div>

        <p className="help">
          Podés ingresar el modelo completo o solamente una parte.
        </p>

      </section>


      <section className="results">

        {busqueda && resultados.length === 0 && (

          <div className="empty">

            <h2>
              No encontramos ese equipo
            </h2>

            <p>
              Verificá el dato ingresado o intentá buscar por nombre,
              marca, modelo o característica técnica.
            </p>

          </div>

        )}


        {resultados.map((producto) => (

          <article
            className="productCard"
            key={producto.modelo}
          >

            <div>

              <span className="tag">
                {producto.tipo_equipo}
              </span>

              <h2>
                {producto.nombre}
              </h2>

              <div className="productInfo">

                <span>
                  <strong>Marca:</strong>{" "}
                  {producto.marca}
                </span>

                <span>
                  <strong>Modelo:</strong>{" "}
                  {producto.modelo}
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
    </>
  );
}
