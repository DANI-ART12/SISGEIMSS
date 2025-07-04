/* ---------- CATÁLOGOS ---------- */

CREATE TABLE especialidades (
    id  SERIAL PRIMARY KEY,
    clave VARCHAR(20) UNIQUE,
    descripcion VARCHAR(150),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE partidas_presupuestales (
    id  SERIAL PRIMARY KEY,
    clave VARCHAR(20) UNIQUE,
    descripcion VARCHAR(150),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tipos_viatico (
    id  SERIAL PRIMARY KEY,
    descripcion VARCHAR(150),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE catalogo_autgas (
    id  SERIAL PRIMARY KEY,
    codigo_autorizacion VARCHAR(30) UNIQUE,
    descripcion VARCHAR(150),
    created_at TIMESTAMP DEFAULT NOW()
);

/* ---------- MAESTROS ---------- */

CREATE TABLE funcionarios (
    id  SERIAL PRIMARY KEY,
    nombre       VARCHAR(150) NOT NULL,
    rfc          VARCHAR(15)  UNIQUE NOT NULL,
    curp         VARCHAR(18),
    matricula    VARCHAR(20),
    puesto       VARCHAR(100),
    nivel_tabular VARCHAR(20),
    adscripcion  VARCHAR(150),
    telefono     VARCHAR(20),
    email        VARCHAR(120),
    especialidad_id INT REFERENCES especialidades(id),
    created_at   TIMESTAMP DEFAULT NOW(),
    updated_at   TIMESTAMP DEFAULT NOW()
);

/* ---------- COMISIONES Y DOCUMENTOS ---------- */

CREATE TABLE comisiones (
    id  SERIAL PRIMARY KEY,
    folio VARCHAR(30) UNIQUE,               -- se autogenera (ver trigger)
    funcionario_id INT REFERENCES funcionarios(id),
    fecha_inicio DATE NOT NULL,
    fecha_fin    DATE NOT NULL,
    lugar_comision VARCHAR(200),
    objeto_comision TEXT,
    medio_transporte VARCHAR(50),
    num_acuerdo_autorizacion VARCHAR(50),
    centro_costos    VARCHAR(50),
    entidad_pagadora VARCHAR(50),
    observaciones    TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT chk_fechas_validas CHECK (fecha_fin >= fecha_inicio)
);

CREATE TABLE pliegos (
    id  SERIAL PRIMARY KEY,
    comision_id INT REFERENCES comisiones(id),
    fecha_emision DATE,
    num_oficio   VARCHAR(50),
    partida_presupuestal_id INT REFERENCES partidas_presupuestales(id),
    catalogo_autgas_id INT REFERENCES catalogo_autgas(id),
    clave_presupuestal TEXT,
    disponibilidad_presupuestal DECIMAL(12,2),
    anticipo_viaticos DECIMAL(12,2),
    anticipo_pasajes  DECIMAL(12,2),
    total_autorizado  DECIMAL(12,2),
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT chk_pliego_montos CHECK (
        COALESCE(anticipo_viaticos,0)  >= 0 AND
        COALESCE(anticipo_pasajes,0)   >= 0 AND
        COALESCE(total_autorizado,0)   >= 0
    )
);

CREATE TABLE firmas_pliego (
    id  SERIAL PRIMARY KEY,
    pliego_id INT REFERENCES pliegos(id),
    nombre     VARCHAR(150),
    puesto     VARCHAR(120),
    tipo_firma VARCHAR(40),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE informes_comision (
    id  SERIAL PRIMARY KEY,
    comision_id INT REFERENCES comisiones(id),
    resumen_actividades   TEXT,
    objetivos_cumplidos   TEXT,
    observaciones_generales TEXT,
    fecha_presentacion DATE,
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE comprobaciones (
    id  SERIAL PRIMARY KEY,
    comision_id INT REFERENCES comisiones(id),
    fecha_comprobacion DATE,
    total_comprobado   DECIMAL(12,2),
    devengado_viaticos DECIMAL(12,2),
    devengado_pasajes  DECIMAL(12,2),
    monto_devuelto     DECIMAL(12,2),
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT chk_montos_comprob CHECK (
        COALESCE(total_comprobado,0)   >= 0 AND
        COALESCE(devengado_viaticos,0) >= 0 AND
        COALESCE(devengado_pasajes,0)  >= 0 AND
        COALESCE(monto_devuelto,0)     >= 0
    )
);

CREATE TABLE firmas_comprobacion (
    id  SERIAL PRIMARY KEY,
    comprobacion_id INT REFERENCES comprobaciones(id),
    nombre     VARCHAR(150),
    puesto     VARCHAR(120),
    tipo_firma VARCHAR(40),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE viaticos (
    id  SERIAL PRIMARY KEY,
    comprobacion_id INT REFERENCES comprobaciones(id),
    tipo_viatico_id INT REFERENCES tipos_viatico(id),
    concepto   VARCHAR(150),
    monto      DECIMAL(12,2) CHECK (monto >= 0),
    num_factura VARCHAR(50),
    proveedor   VARCHAR(150),
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

/* ---------- USUARIOS ---------- */

CREATE TABLE usuarios (
    id  SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    password_hash  VARCHAR(256),
    rol            VARCHAR(50),
    funcionario_id INT REFERENCES funcionarios(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

/* ---------- ÍNDICES ---------- */

CREATE INDEX idx_comisiones_funcionario  ON comisiones(funcionario_id);
CREATE INDEX idx_pliegos_comision        ON pliegos(comision_id);
CREATE INDEX idx_comprobaciones_comision ON comprobaciones(comision_id);
CREATE INDEX idx_viaticos_comprobacion   ON viaticos(comprobacion_id);

/* ---------- TRIGGER updated_at GENÉRICO ---------- */

CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'funcionarios','comisiones','pliegos',
    'informes_comision','comprobaciones',
    'viaticos','usuarios'
  ] LOOP
    EXECUTE format(
      'CREATE TRIGGER trg_%I_updated
       BEFORE UPDATE ON %I
       FOR EACH ROW EXECUTE FUNCTION set_updated_at();', t, t);
  END LOOP;
END $$;

/* ---------- FOLIO SECUENCIAL AAAA-000001 ---------- */

CREATE SEQUENCE seq_folio_per_year START 1;

CREATE OR REPLACE FUNCTION generar_folio()
RETURNS TEXT AS $$
DECLARE
  anio TEXT := TO_CHAR(CURRENT_DATE,'YYYY');
  consecutivo TEXT := LPAD(nextval('seq_folio_per_year')::TEXT,6,'0');
BEGIN
  RETURN anio || '-' || consecutivo;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_folio_default()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.folio IS NULL THEN
     NEW.folio := generar_folio();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_folio
BEFORE INSERT ON comisiones
FOR EACH ROW EXECUTE FUNCTION set_folio_default();
