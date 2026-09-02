 {/* =================================================
            JSX
  ================================================= */}


/* =========================================================
   APP.JSX
   DASHBOARD COMERCIAL - PRISA MEDIA
   ========================================================= */

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import * as XLSX from "xlsx";

import {
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Landmark,
  Shirt,
  UtensilsCrossed,
  GraduationCap,
  ShoppingCart,
  Car,
  Briefcase,
  HeartPulse,
  ShieldCheck,
  Cpu,
  Building2,
  Clapperboard,
  Plane,
  LayoutGrid,
  FileText,
  CheckCircle2,
  Lightbulb,
  DollarSign,
  Users,
  Tag,
  Download,
  Eye,
  Home as HomeIcon,
  Building,
  Menu,
  X,
  TrendingUp,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  Bar,
  CartesianGrid,
} from "recharts";


/* =========================================================
   CONFIGURACIÓN GENERAL
   ========================================================= */

const EXCEL_FILE = "/BS_PRISA.xlsx";

const IMAGE_PATH = "/images/";


/* =========================================================
   USUARIOS
   ========================================================= */
const DB_USER_IDS = {
  "administrador": 1,
  "tatiana-garcia": 2,
  "glen-orillo": 3,
  "juan-pablo": 4,
  "jonathan-velasquez": 5,
  "sthefanie-botello": 6,
  "diana-milena": 7,
  "juan-sebastian": 8,
  "tatiana-pelaez": 9,
  "ivonne-adriana": 10,
  "william-ocampo": 11,
};
const USERS = [

 /* =======================================================
   USUARIOS CON ACCESO TOTAL
   ======================================================= */

{
  id: "tatiana-garcia",
  dbId: 2,

  name: "Tatiana García Calderón",
  shortName: "Tatiana García",
  initials: "TG",

  role: "Gerente comercial nacional",

  filterTeam: "",
  canViewAll: true,

  image:
    `${IMAGE_PATH}TatianaGarciaHD.png`,
},


{
  id: "glen-orillo",
  dbId: 3,

  name: "Glen Orillo Starke",
  shortName: "Glen",
  initials: "GO",

  role: "Director Innovación Digital",

  filterTeam: "",
  canViewAll: true,

  image:
    `${IMAGE_PATH}GlenHD.png`,
},


{
  id: "juan-pablo",
  dbId: 4,

  name: "Juan Pablo Godoy",
  shortName: "Juan Pablo",
  initials: "JG",

  role: "Encargado de N1 y N3",

  filterTeam: "",
  canViewAll: true,

  image:
    `${IMAGE_PATH}JuanPabloHD.png`,
},


{
  id: "jonathan",
  dbId: 5,

  name: "Jonathan Velásquez",
  shortName: "Jonathan",
  initials: "JV",

  role: "Encargado de N2 y N4",

  filterTeam: "",
  canViewAll: true,

  image:
    `${IMAGE_PATH}JonathanHD.png`,
},


{
  id: "sthefanie",
  dbId: 6,

  name: "Sthefanie Botello",
  shortName: "Sthefanie",
  initials: "SB",

  role: "Encargada de N5",

  filterTeam: "",
  canViewAll: true,

  image:
    `${IMAGE_PATH}sthef1HD.png`,
},


/* =======================================================
   USUARIO ADMINISTRADOR
   ======================================================= */

{
  id: "administrador",
  dbId: 1,

  name: "Administrador",
  shortName: "Administrador",
  initials: "AD",

  role: "Administrador",

  filterTeam: "",
  canViewAll: true,

  image: "",
},


/* =======================================================
   USUARIOS DE EQUIPOS NACIONALES
   ======================================================= */

{
  id: "diana",
  dbId: 7,

  name: "Diana Milena Contreras Rodriguez",
  shortName: "Diana Milena",
  initials: "DM",

  role: "Líder Nacional 1",

  filterTeam: "Nacional 1",
  canViewAll: false,

  image:
    `${IMAGE_PATH}DianaMilenaContreras.png`,
},


{
  id: "juan-sebastian",
  dbId: 8,

  name: "Juan Sebastian Abella Quintero",
  shortName: "Juan Sebastian",
  initials: "JS",

  role: "Líder Nacional 2",

  filterTeam: "Nacional 2",
  canViewAll: false,

  image:
    `${IMAGE_PATH}JuanSebastianAbellaQuintero.png`,
},


{
  id: "tatiana-pelaez",
  dbId: 9,

  name: "Tatiana Pelaez Copete",
  shortName: "Tatiana Pelaez",
  initials: "TP",

  role: "Líder Nacional 3",

  filterTeam: "Nacional 3",
  canViewAll: false,

  image:
    `${IMAGE_PATH}TatianaPelaezCopete.png`,
},


{
  id: "ivonne",
  dbId: 10,

  name: "Ivonne Adriana Moriones Alvarez",
  shortName: "Ivonne Adriana",
  initials: "IA",

  role: "Líder Nacional 4",

  filterTeam: "Nacional 4",
  canViewAll: false,

  image:
    `${IMAGE_PATH}IvonneAdrianaMorionesAlvarez.png`,
},


{
  id: "william",
  dbId: 11,

  name: "William Ocampo Arguello",
  shortName: "William",
  initials: "WO",

  role: "Líder Nacional 5",

  filterTeam: "Nacional 5",
  canViewAll: false,

  image:
    `${IMAGE_PATH}WilliamOcampoArguello.png`,
},
];

/* =========================================================
   EQUIPO DE INNOVACIÓN DIGITAL
   ========================================================= */

const INNOVATION_TEAM = [

  {
    name: "Glen Orillo Starke",

    role:
      "Director Innovación Digital",

    initials: "GO",

    image:
      `${IMAGE_PATH}GlenHD.png`,

    desc:
      "Lidera la estrategia y visión del Área de Innovación Digital de Prisa Media.",
  },


  {
    name: "Juan Pablo Godoy",

    role:
      "Encargado de N1 y N3",

    initials: "JG",

    image:
      `${IMAGE_PATH}JuanPabloHD.png`,

    desc:
      "Lidera la creación y desarrollo de propuestas digitales para las Nacionales N1 y N3.",
  },


  {
    name: "Jonathan Velásquez",

    role:
      "Encargado de N2 y N4",

    initials: "JV",

    image:
      `${IMAGE_PATH}JonathanHD.png`,

    desc:
      "Responsable del diseño y ejecución de propuestas digitales para las Nacionales N2 y N4.",
  },


  {
    name: "Sthefanie Botello",

    role:
      "Encargada de N5",

    initials: "SB",

    image:
      `${IMAGE_PATH}sthef1HD.png`,

    desc:
      "Encargada de desarrollar y optimizar propuestas digitales para la Nacional N5.",
  },

];


/* =========================================================
   EQUIPOS NACIONALES
   ========================================================= */

const NATIONAL_TEAMS = [

  {
    name:
      "Diana Milena Contreras Rodriguez",

    role:
      "Líder Nacional 1",

    national:
      "Nacional 1",

    initials: "DM",

    image:
      `${IMAGE_PATH}DianaMilenaContreras.png`,
  },


  {
    name:
      "Juan Sebastian Abella Quintero",

    role:
      "Líder Nacional 2",

    national:
      "Nacional 2",

    initials: "JS",

    image:
      `${IMAGE_PATH}JuanSebastianAbellaQuintero.png`,
  },


  {
    name:
      "Tatiana Pelaez Copete",

    role:
      "Líder Nacional 3",

    national:
      "Nacional 3",

    initials: "TP",

    image:
      `${IMAGE_PATH}TatianaPelaezCopete.png`,
  },


  {
    name:
      "Ivonne Adriana Moriones Alvarez",

    role:
      "Líder Nacional 4",

    national:
      "Nacional 4",

    initials: "IA",

    image:
      `${IMAGE_PATH}IvonneAdrianaMorionesAlvarez.png`,
  },


  {
    name:
      "William Ocampo Arguello",

    role:
      "Líder Nacional 5",

    national:
      "Nacional 5",

    initials: "WO",

    image:
      `${IMAGE_PATH}WilliamOcampoArguello.png`,
  },

];


/* =========================================================
   COLORES DEL DASHBOARD
   ========================================================= */

const COLORS = {

  bg: "#0a0b10",

  panel: "#12141c",

  panel2: "#171a24",

  border: "#242836",

  text: "#e9eaf0",

  sub: "#8b8fa3",

  pink: "#e6197a",

  pinkSoft:
    "rgba(230,25,122,0.14)",

  green: "#2fbf6e",

  greenSoft:
    "rgba(47,191,110,0.14)",

  amber: "#e0a52c",

  amberSoft:
    "rgba(224,165,44,0.14)",

  blue: "#3b8ef0",

  blueSoft:
    "rgba(59,142,240,0.14)",

  purple: "#8b6ff0",

};


/* =========================================================
   COLORES DE LAS NACIONALES
   ========================================================= */

const NACIONAL_COLORS = {

  "Nacional 1":
    COLORS.pink,

  "Nacional 2":
    COLORS.blue,

  "Nacional 3":
    COLORS.amber,

  "Nacional 4":
    COLORS.green,

  "Nacional 5":
    COLORS.purple,


  N1:
    COLORS.pink,

  N2:
    COLORS.blue,

  N3:
    COLORS.amber,

  N4:
    COLORS.green,

  N5:
    COLORS.purple,


  ALIANZAS:
    "#6dd3c7",

  GENERAL:
    "#6dd3c7",

};


/* =========================================================
   ORDEN DE RUBROS
   ========================================================= */

const RUBRO_ORDER = [

  "Banca",

  "Moda",

  "Gastronomía",

  "Educación",

  "Consumo Masivo",

  "Automotriz",

  "Servicios",

  "Salud",

  "Seguros",

  "Tecnología",

  "Inmobiliario",

  "Entretenimiento",

  "Viajes",

  "Otros",

];


/* =========================================================
   ICONOS DE RUBROS
   ========================================================= */

const RUBRO_ICONS = {

  Banca:
    Landmark,

  Moda:
    Shirt,

  Gastronomía:
    UtensilsCrossed,

  Educación:
    GraduationCap,

  "Consumo Masivo":
    ShoppingCart,

  Automotriz:
    Car,

  Servicios:
    Briefcase,

  Salud:
    HeartPulse,

  Seguros:
    ShieldCheck,

  Tecnología:
    Cpu,

  Inmobiliario:
    Building2,

  Entretenimiento:
    Clapperboard,

  Viajes:
    Plane,

  Otros:
    LayoutGrid,

};


/* =========================================================
   METADATA DE ESTADOS
   ========================================================= */

const ESTADO_META = {

  seguimiento: {

    label:
      "En seguimiento",

    color:
      COLORS.pink,

    soft:
      COLORS.pinkSoft,

  },


  cerrada: {

    label:
      "Cerrada",

    color:
      COLORS.green,

    soft:
      COLORS.greenSoft,

  },


  oportunidad: {

    label:
      "Oportunidad",

    color:
      COLORS.amber,

    soft:
      COLORS.amberSoft,

  },

};


/* =========================================================
   NORMALIZAR TEXTO
   ========================================================= */

function normalizeText(value) {

  return String(value ?? "")

    .normalize("NFD")

    .replace(
      /[\u0300-\u036f]/g,
      ""
    )

    .replace(
      /\s+/g,
      " "
    )

    .trim()

    .toLowerCase();

}

/* =========================================================
   DETECTAR RUBRO POR CONTENIDO
   ========================================================= */

function detectarRubroPorContenido(
  texto = ""
) {

  const t =
    normalizeText(texto);


  if (
    /adidas|nike|arturo calle|decathlon|pash|ostu|flamingo|egalite|ta.?da|cromantic|aruma/.test(t)
  ) {
    return "Moda";
  }


  if (
    /automotriz|automovil|automóvil|carro|vehiculo|vehículo|concesionario|concesionaria|toyota|mazda|nissan|ford|volvo|autogermana|alciautos|autoniza|changan/.test(t)
  ) {
    return "Automotriz";
  }


  if (
    /banco|banca|davivienda|bbva|bancolombia|banco de occidente|tarjeta de credito|tarjeta de crédito|financiero|financiera/.test(t)
  ) {
    return "Banca";
  }


  if (
    /educacion|educación|universidad|universitario|colegio|instituto|academia|politecnico|politécnico|andina/.test(t)
  ) {
    return "Educación";
  }


  if (
    /salud|clinica|clínica|hospital|medico|médico|medicina|farmacia|laboratorio|laboratorios|dr simi|colsanitas|compensar|cafam|medplus/.test(t)
  ) {
    return "Salud";
  }


  if (
    /seguro|seguros|aseguradora|asegurador|allianz|zurich|prosegur/.test(t)
  ) {
    return "Seguros";
  }


  if (
    /tecnologia|tecnología|software|digital|tecnologico|tecnológico|celular|computador|internet|telecomunicaciones|claro|movistar|samsung|xiaomi|honor|hp|ciberseguridad|ecommerce|e-commerce/.test(t)
  ) {
    return "Tecnología";
  }


  if (
    /inmobiliaria|inmobiliario|constructora|construccion|construcción|vivienda|apartamento|apartamentos|edificio|edificios|oikos|cusezar|urbansa|casa|hogar/.test(t)
  ) {
    return "Inmobiliario";
  }


  if (
    /viaje|viajes|turismo|turistico|turístico|hotel|aerolinea|aerolínea|aviatur|despegar|vacaciones/.test(t)
  ) {
    return "Viajes";
  }


  if (
    /entretenimiento|cine|teatro|musica|música|evento|eventos|concierto|spotify|tiquetes|tiqueteras|disquera|deporte|win sports/.test(t)
  ) {
    return "Entretenimiento";
  }


  if (
    /gastronomia|gastronomía|restaurante|restaurantes|comida|alimento|alimentos|bebida|bebidas|cerveza|cafe|café|cocina|kfc|bavaria|coca cola|coca-cola|casa luker|alqueria/.test(t)
  ) {
    return "Gastronomía";
  }


  if (
    /consumo masivo|supermercado|retail|tienda|tiendas|productos de consumo|consumo|jumbo|makro|falabella|mercado|mercados/.test(t)
  ) {
    return "Consumo Masivo";
  }


  if (
    /servicio|servicios|rappi|amazon|mercado libre|mercadolibre|vanti|punto red/.test(t)
  ) {
    return "Servicios";
  }


  return "Otros";
}

/* =========================================================
   NORMALIZAR NACIONAL
   ========================================================= */

function normalizeNacional(value) {

  const text =
    normalizeText(value);

  if (!text) {
    return "";
  }

  const match =
    text.match(
      /(?:nacional|n)\s*([1-5])/
    );

  if (!match) {
    return "";
  }

  return `Nacional ${match[1]}`;

}


/* =========================================================
   COMPARAR NACIONALES
   ========================================================= */

function nacionalMatches(
  first,
  second
) {

  const a =
    normalizeNacional(first);

  const b =
    normalizeNacional(second);

  return (
    a !== "" &&
    a === b
  );

}


/* =========================================================
   OBTENER NÚMERO DE NACIONAL
   ========================================================= */

function getNationalNumber(value) {

  const normalized =
    normalizeNacional(value);

  const match =
    normalized.match(
      /(\d+)/
    );

  if (!match) {
    return null;
  }

  return Number(
    match[1]
  );

}


/* =========================================================
   CONVERTIR VALORES DEL EXCEL
   ========================================================= */

function toNumber(value) {

  if (
    typeof value ===
    "number"
  ) {

    return Number.isFinite(
      value
    )
      ? value
      : 0;

  }


  if (
    value === null ||
    value === undefined
  ) {

    return 0;

  }


  let text =
    String(value)

      .trim()

      .replace(
        /\$/g,
        ""
      )

      .replace(
        /\s/g,
        ""
      );


  if (!text) {
    return 0;
  }


  /*
   * FORMATO COLOMBIANO
   *
   * 1.250.000
   * 1.250.000,50
   */

  if (
    text.includes(".") &&
    text.includes(",")
  ) {

    const lastDot =
      text.lastIndexOf(".");

    const lastComma =
      text.lastIndexOf(",");


    if (
      lastComma >
      lastDot
    ) {

      text =
        text

          .replace(
            /\./g,
            ""
          )

          .replace(
            ",",
            "."
          );

    } else {

      text =
        text.replace(
          /,/g,
          ""
        );

    }

  }

  else if (
    text.includes(",")
  ) {

    const commaParts =
      text.split(",");


    if (
      commaParts.length === 2 &&
      commaParts[1].length <= 2
    ) {

      text =
        text.replace(
          ",",
          "."
        );

    } else {

      text =
        text.replace(
          /,/g,
          ""
        );

    }

  }

  else if (
    text.includes(".")
  ) {

    const dotParts =
      text.split(".");


    if (
      dotParts.length > 2
    ) {

      text =
        text.replace(
          /\./g,
          ""
        );

    }

  }


  const result =
    Number(text);


  return Number.isFinite(
    result
  )
    ? result
    : 0;

}


/* =========================================================
   FORMATEAR MONEDA
   ========================================================= */

function formatCurrency(value) {

  return new Intl.NumberFormat(
    "es-CO",
    {

      style:
        "currency",

      currency:
        "COP",

      maximumFractionDigits:
        0,

    }
  ).format(
    toNumber(value)
  );

}


/* =========================================================
   FORMATEAR DINERO CORTO
   ========================================================= */

function formatMoneyShort(value) {

  const amount =
    toNumber(value);


  if (
    amount >=
    1000000000
  ) {

    return `$${(
      amount / 1000000000
    ).toFixed(1)} B`;

  }


  if (
    amount >=
    1000000
  ) {

    return `$${(
      amount / 1000000
    ).toFixed(1)} M`;

  }


  if (
    amount >=
    1000
  ) {

    return `$${(
      amount / 1000
    ).toFixed(1)} K`;

  }


  return formatCurrency(
    amount
  );

}


/* =========================================================
   FORMATEAR FECHA
   ========================================================= */

function formatDate(value) {

  if (!value) {
    return "—";
  }


  let date;


  if (
    value instanceof Date
  ) {

    date = value;

  } else {

    date =
      new Date(value);

  }


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return String(value);

  }


  return new Intl.DateTimeFormat(
    "es-CO",
    {

      day:
        "2-digit",

      month:
        "2-digit",

      year:
        "numeric",

    }
  ).format(date);

}


/* =========================================================
   OBTENER INICIALES
   ========================================================= */

function getInitials(name) {

  const text =
    String(name ?? "")
      .trim();


  if (!text) {
    return "—";
  }


  const parts =
    text

      .split(/\s+/)

      .filter(Boolean);


  if (
    parts.length === 1
  ) {

    return parts[0]

      .slice(0, 2)

      .toUpperCase();

  }


  return (

    parts[0][0] +

    parts[
      parts.length - 1
    ][0]

  ).toUpperCase();

}
/* =========================================================
   BUSCAR FOTO DEL USUARIO / ASESOR
   ========================================================= */

function getUserImage(name) {

  const normalized =
    normalizeText(name);


  if (
    normalized.includes("glen")
  ) {

    return `${IMAGE_PATH}GlenHD.png`;

  }


  if (
    normalized.includes("juan pablo")
  ) {

    return `${IMAGE_PATH}JuanPabloHD.png`;

  }


  if (
    normalized.includes("jonathan")
  ) {

    return `${IMAGE_PATH}JonathanHD.png`;

  }


  if (
    normalized.includes("sthefanie") ||
    normalized.includes("stefanie")
  ) {

    return `${IMAGE_PATH}sthef1HD.png`;

  }


  if (
    normalized.includes("diana")
  ) {

    return `${IMAGE_PATH}DianaMilenaContreras.png`;

  }


  if (
    normalized.includes("juan sebastian")
  ) {

    return `${IMAGE_PATH}JuanSebastianAbellaQuintero.png`;

  }


  if (
    normalized.includes("tatiana pelaez")
  ) {

    return `${IMAGE_PATH}TatianaPelaezCopete.png`;

  }


  if (
    normalized.includes("ivonne")
  ) {

    return `${IMAGE_PATH}IvonneAdrianaMorionesAlvarez.png`;

  }


  if (
    normalized.includes("william")
  ) {

    return `${IMAGE_PATH}WilliamOcampoArguello.png`;

  }


  if (
    normalized.includes("tatiana garcia")
  ) {

    return `${IMAGE_PATH}TatianaGarciaHD.png`;

  }


  return "";

}


/* =========================================================
   AVATAR
   ========================================================= */

function Avatar({
  name,
  initials,
  image,
  size = "medium",
}) {

  const [
    imageFailed,
    setImageFailed,
  ] = useState(false);


  useEffect(() => {

    setImageFailed(false);

  }, [image]);


  const finalInitials =
    initials ||
    getInitials(name);


  return (

    <div
      className={
        `avatar avatar-${size}`
      }
    >

      {image && !imageFailed ? (

        <img
          src={image}
          alt={
            name ||
            "Usuario"
          }
          onError={() =>
            setImageFailed(true)
          }
        />

      ) : (

        <span>
          {finalInitials}
        </span>

      )}

    </div>

  );

}


/* =========================================================
   OBTENER VALOR DE UNA COLUMNA
   ---------------------------------------------------------
   Permite trabajar aunque Excel tenga pequeñas diferencias
   en mayúsculas, tildes o espacios.
   ========================================================= */

function getRowValue(
  row,
  possibleNames = []
) {

  const entries =
    Object.entries(row || {});


  for (
    const possibleName
    of possibleNames
  ) {

    const target =
      normalizeText(
        possibleName
      );


    const found =
      entries.find(
        ([key]) =>
          normalizeText(key) ===
          target
      );


    if (found) {

      return found[1];

    }

  }


  return "";

}


/* =========================================================
   BUSCAR NACIONAL DENTRO DE UNA FILA
   ========================================================= */

function getRowNacional(row) {

  const value =
    getRowValue(
      row,
      [
        "NACIONAL",
        "NACIONAL ",
        "NACIONALES",
        "EQUIPO",
        "EQUIPO NACIONAL",
        "NACIONALIDAD",
      ]
    );


  const normalized =
    normalizeNacional(value);


  if (normalized) {

    return normalized;

  }


  /*
   * Algunas hojas del Excel pueden venir
   * organizadas por bloques N1, N2, etc.
   *
   * Si no existe una columna Nacional,
   * la Nacional será suministrada por
   * loadExcelData() según la hoja/bloque.
   */

  return "";

}


/* =========================================================
   BUSCAR ESTADO
   ========================================================= */

function normalizeEstado(value) {

  const text =
    normalizeText(value);


  if (
    text.includes(
      "seguimiento"
    )
  ) {

    return "seguimiento";

  }


  if (
    text.includes(
      "cerrada"
    ) ||
    text.includes(
      "cerrado"
    )
  ) {

    return "cerrada";

  }


  if (
    text.includes(
      "oportunidad"
    )
  ) {

    return "oportunidad";

  }


  return "oportunidad";

}


/* =========================================================
   BUSCAR RUBRO
   ========================================================= */

function normalizeRubro(value) {

  const text =
    normalizeText(value);


  if (!text) {

    return "";

  }


  const found =
    RUBRO_ORDER.find(
      (rubro) =>
        normalizeText(rubro) ===
        text
    );


  if (found) {

    return found;

  }


  /*
   * Permite detectar rubros aunque
   * el Excel tenga texto adicional.
   */

  const contains =
    RUBRO_ORDER.find(
      (rubro) =>
        text.includes(
          normalizeText(rubro)
        )
    );


  return contains || String(value).trim();

}

/* =========================================================
   NORMALIZAR FILA DEL EXCEL
   ========================================================= */

function normalizeExcelRow(
  row,
  index = 0,
  nacionalFromSheet = ""
) {

  const clean = (value) =>
    String(value ?? "").trim();


  /* =====================================================
     NACIONAL
     ===================================================== */

  const nacionalFromRow =
    getRowNacional(row);

  const normalizedNacional =
    nacionalFromRow ||
    normalizeNacional(
      nacionalFromSheet
    );


  /* =====================================================
     ESTADO
     ===================================================== */

  const estadoRaw =
    clean(
      getRowValue(
        row,
        [
          "ESTADO",
        ]
      )
    );

  const estado =
    normalizeEstado(
      estadoRaw
    );


  /* =====================================================
     VALORES
     ===================================================== */

  const valorPropuesta =
    toNumber(
      getRowValue(
        row,
        [
          "VALOR DE LA PROPUESTA",
          "VALOR PROPUESTA",
          "VALOR DE PROPUESTA",
          "VALOR",
        ]
      )
    );


  const ventaEstimada =
    toNumber(
      getRowValue(
        row,
        [
          "VENTA ESTIMADA",
        ]
      )
    );


  /* =====================================================
     EJECUTIVO
     ===================================================== */

  const ejecutivo =
    clean(
      getRowValue(
        row,
        [
          "NOMBRE EJECUTIVO",
          "EJECUTIVO",
        ]
      )
    );


  /* =====================================================
     CUENTA / MARCA
     ===================================================== */

  const cuenta =
    clean(
      getRowValue(
        row,
        [
          "CUENTA",
          "MARCA",
          "EMPRESA",
        ]
      )
    );


  /* =====================================================
     NECESIDADES
     ===================================================== */

  const necesidad1 =
    clean(
      getRowValue(
        row,
        [
          "NECESIDAD 1",
        ]
      )
    );


  const necesidad2 =
    clean(
      getRowValue(
        row,
        [
          "NECESIDAD 2",
        ]
      )
    );


  const necesidad3 =
    clean(
      getRowValue(
        row,
        [
          "NECESIDAD 3",
        ]
      )
    );


  const necesidad =
    necesidad1 ||
    necesidad2 ||
    necesidad3;


  /* =====================================================
     PLANES DE ACCIÓN
     ===================================================== */

  const planAccion1 =
    clean(
      getRowValue(
        row,
        [
          "PLAN DE ACCIÓN 1",
          "PLAN DE ACCION 1",
        ]
      )
    );


  const avancePlan1 =
    toNumber(
      getRowValue(
        row,
        [
          "AVANCE PLAN 1",
        ]
      )
    );


  const planAccion2 =
    clean(
      getRowValue(
        row,
        [
          "PLAN DE ACCIÓN 2",
          "PLAN DE ACCION 2",
        ]
      )
    );


  const avancePlan2 =
    toNumber(
      getRowValue(
        row,
        [
          "AVANCE PLAN 2",
        ]
      )
    );


  const planAccion3 =
    clean(
      getRowValue(
        row,
        [
          "PLAN DE ACCIÓN 3",
          "PLAN DE ACCION 3",
        ]
      )
    );


  const avancePlan3 =
    toNumber(
      getRowValue(
        row,
        [
          "AVANCE PLAN 3",
        ]
      )
    );


  /* =====================================================
     OPORTUNIDAD
     ===================================================== */

  const oportunidad =
    clean(
      getRowValue(
        row,
        [
          "OPORTUNIDAD",
        ]
      )
    );


  /* =====================================================
     RUBRO
     ===================================================== */

  const rubroExcel =
    normalizeRubro(
      getRowValue(
        row,
        [
          "RUBRO",
          "Rubro",
          "rubro",
          "SECTOR",
          "SECTOR / RUBRO",
        ]
      )
    );


  /*
   * Primero usamos el rubro que venga
   * directamente desde el Excel.
   *
   * Si está vacío, utilizamos el contenido
   * de la propuesta para identificarlo.
   */

  const textoRubro =
    normalizeText(
      [
        cuenta,
        necesidad1,
        necesidad2,
        necesidad3,
        oportunidad,
        planAccion1,
        planAccion2,
        planAccion3,
      ]
        .filter(Boolean)
        .join(" ")
    );


  const rubro =
    rubroExcel ||
    detectarRubroPorContenido(
      textoRubro
    );


  /* =====================================================
     ASESOR
     ===================================================== */

  const asesor =
    clean(
      getRowValue(
        row,
        [
          "ASESOR INNOVACION DIGITAL",
          "ASESOR INNOVACIÓN DIGITAL",
          "ASESOR",
          "ASESOR INNOVACION",
          "ASESOR INNOVACIÓN",
        ]
      )
    );


  /* =====================================================
     OTROS CAMPOS
     ===================================================== */

  const clave =
    clean(
      getRowValue(
        row,
        [
          "CLAVE",
        ]
      )
    );


  const prioridad =
    clean(
      getRowValue(
        row,
        [
          "PRIORIDAD",
        ]
      )
    );


  const responsable =
    clean(
      getRowValue(
        row,
        [
          "RESPONSABLE",
        ]
      )
    );


  const mes =
    clean(
      getRowValue(
        row,
        [
          "MES",
        ]
      )
    );


  const fechaSolicitud =
    getRowValue(
      row,
      [
        "FECHA SOLICITUD",
      ]
    );


  const fechaEntrega =
    getRowValue(
      row,
      [
        "FECHA DE ENTREGA",
      ]
    );


  const linkPresentacion =
    clean(
      getRowValue(
        row,
        [
          "LINK DE PRESENTACION",
          "LINK DE PRESENTACIÓN",
        ]
      )
    );


  /* =====================================================
     RESULTADO NORMALIZADO
     ===================================================== */

  return {

    id:
      index,


    nacional:
      normalizedNacional,


    equipo:
      normalizedNacional
        ? normalizedNacional
            .replace(
              "Nacional ",
              "N"
            )
            .trim()
        : "",


    ejecutivo,

    cuenta,

    rubro,


    ventaEstimada,


    necesidad1,

    necesidad2,

    necesidad3,

    necesidad,


    planAccion1,

    avancePlan1,

    planAccion2,

    avancePlan2,

    planAccion3,

    avancePlan3,


    oportunidad,


    estadoRaw,

    estado,


    clave,

    prioridad,

    responsable,

    mes,


    fechaSolicitud,

    fechaEntrega,


    linkPresentacion,


    valorPropuesta,

    valor:
      valorPropuesta,


    asesor,

    asesorInnovacionDigital:
      asesor,


    tieneBudget:
      valorPropuesta > 0 ||
      ventaEstimada > 0,

  };

}

/* =========================================================
   IDENTIFICAR NACIONAL POR NOMBRE DE HOJA
   ========================================================= */

function getSheetNacional(
  sheetName
) {

  const normalized =
    normalizeText(
      sheetName
    );


  /*
   * N1 / N2 / N3 / N4 / N5
   */

  const nMatch =
    normalized.match(
      /\bn\s*([1-5])\b/
    );


  if (nMatch) {

    return `Nacional ${nMatch[1]}`;

  }


  /*
   * Nacional 1 / Nacional 2...
   */

  const nacionalMatch =
    normalized.match(
      /nacional\s*([1-5])/
    );


  if (nacionalMatch) {

    return `Nacional ${nacionalMatch[1]}`;

  }


  return "";

}


/* =========================================================
   DEDUCIR NACIONAL POR BLOQUE
   ========================================================= */

function inferNacionalFromRow(
  row,
  fallbackNacional = ""
) {

  const direct =
    getRowNacional(row);


  if (direct) {

    return direct;

  }


  return normalizeNacional(
    fallbackNacional
  );

}


/* =========================================================
   CARGAR EXCEL
   ========================================================= */

async function loadExcelData() {

  const response =
    await fetch(
      EXCEL_FILE
    );


  if (!response.ok) {

    throw new Error(
      `No se pudo cargar ${EXCEL_FILE}`
    );

  }


  const buffer =
    await response.arrayBuffer();


  const workbook =
    XLSX.read(
      buffer,
      {
        type: "array",
        cellDates: true,
      }
    );


  const allRows = [];


  workbook.SheetNames.forEach(
    (
      sheetName,
      sheetIndex
    ) => {

      const worksheet =
        workbook.Sheets[
          sheetName
        ];


      if (!worksheet) {
        return;
      }


      const rawRows =
        XLSX.utils.sheet_to_json(
          worksheet,
          {
            defval: "",
            raw: true,
          }
        );


      if (
        !rawRows ||
        rawRows.length === 0
      ) {

        return;

      }


      /*
       * Intentamos identificar la Nacional
       * de la hoja.
       */

      const sheetNacional =
        getSheetNacional(
          sheetName
        );


      rawRows.forEach(
        (
          row,
          rowIndex
        ) => {

          /*
           * Si la fila trae Nacional,
           * tiene prioridad.
           */

          const rowNacional =
            inferNacionalFromRow(
              row,
              sheetNacional
            );


          const normalized =
            normalizeExcelRow(
              row,
              `${sheetIndex}-${rowIndex}`,
              rowNacional
            );


          /*
           * Ignorar filas completamente vacías.
           */

          const hasData =
            normalized.ejecutivo ||
            normalized.cuenta ||
            normalized.necesidad ||
            normalized.valorPropuesta ||
            normalized.rubro ||
            normalized.estadoRaw;


          if (!hasData) {
            return;
          }


          allRows.push(
            normalized
          );

        }
      );

    }
  );


  /*
   * Si existen filas duplicadas,
   * las eliminamos usando una firma
   * estable de sus datos principales.
   */

  const uniqueRows =
    [];

  const seen =
    new Set();


  allRows.forEach(
    (row) => {

      const signature =
        [

          normalizeText(
            row.nacional
          ),

          normalizeText(
            row.ejecutivo
          ),

          normalizeText(
            row.cuenta
          ),

          normalizeText(
            row.necesidad
          ),

          normalizeText(
            row.estadoRaw
          ),

          row.valorPropuesta,

        ].join("|");


      if (
        seen.has(signature)
      ) {

        return;

      }


      seen.add(
        signature
      );

      uniqueRows.push(
        row
      );

    }
  );


  return uniqueRows.map(
    (row, index) => ({
      ...row,
      id: index,
    })
  );

}


/* =========================================================
   PARTE 2 TERMINADA
   ========================================================= */

   /* =========================================================
   PARTE 3/6
   USUARIOS + PERMISOS + FILTROS + MÉTRICAS
   ========================================================= */


/* =========================================================
   BUSCAR USUARIO POR NOMBRE
   ========================================================= */

function findUserByName(name) {

  const normalized =
    normalizeText(name);

  if (!normalized) {
    return null;
  }

  return (
    USERS.find(
      (user) =>
        normalizeText(
          user.name
        ) === normalized
    ) ||
    USERS.find(
      (user) =>
        normalized.includes(
          normalizeText(
            user.name
          )
        ) ||
        normalizeText(
          user.name
        ).includes(
          normalized
        )
    ) ||
    null
  );

}


/* =========================================================
   OBTENER ASESOR
   ========================================================= */

function getAdvisorData(
  advisorName
) {

  const name =
    String(
      advisorName ?? ""
    ).trim();


  if (!name) {

    return {
      name: "Sin asignar",
      image: "",
      initials: "SA",
    };

  }


  const user =
    findUserByName(
      name
    );


  if (user) {

    return {
      name:
        user.name,

      image:
        user.image,

      initials:
        user.initials ||
        getInitials(
          user.name
        ),
    };

  }


  return {
    name,

    image:
      getUserImage(
        name
      ),

    initials:
      getInitials(
        name
      ),
  };

}


/* =========================================================
   FILTRAR POR PERMISOS DEL USUARIO
   ========================================================= */

function applyUserPermissions(
  rows = [],
  user = null
) {

  if (!user) {
    return [];
  }


  /*
   * USUARIOS CON ACCESO TOTAL
   *
   * Tatiana García
   * Glen
   * Juan Pablo
   * Jonathan
   * Sthefanie
   */

  if (
    user.canViewAll
  ) {

    return rows;

  }


  /*
   * USUARIOS DE NACIONAL
   *
   * Diana → N1
   * Juan Sebastián → N2
   * Tatiana Peláez → N3
   * Ivonne → N4
   * William → N5
   */

  if (
    user.filterTeam
  ) {

    return rows.filter(
      (row) =>
        nacionalMatches(
          row.nacional,
          user.filterTeam
        )
    );

  }


  return [];

}


/* =========================================================
   FILTRAR FILAS
   ========================================================= */

function filterRows({
  rows = [],
  user = null,
  selectedTeam = "Todos",
  selectedStatus = "Todos",
  selectedRubro = "Todos",
  searchTerm = "",
}) {

  /*
   * PRIMER NIVEL:
   * permisos del usuario.
   */

  let result =
    applyUserPermissions(
      rows,
      user
    );


  /* =======================================================
     SEGUNDO NIVEL:
     NACIONAL
     ======================================================= */

  if (
    selectedTeam &&
    selectedTeam !== "Todos"
  ) {

    /*
     * Un líder nacional NO puede cambiar
     * a otra Nacional.
     */

    if (
      user?.filterTeam
    ) {

      result =
        result.filter(
          (row) =>
            nacionalMatches(
              row.nacional,
              user.filterTeam
            )
        );

    } else {

      result =
        result.filter(
          (row) =>
            nacionalMatches(
              row.nacional,
              selectedTeam
            )
        );

    }

  }


  /* =======================================================
     TERCER NIVEL:
     ESTADO
     ======================================================= */

  if (
    selectedStatus &&
    selectedStatus !== "Todos"
  ) {

    const target =
      normalizeText(
        selectedStatus
      );


    result =
      result.filter(
        (row) => {

          const estado =
            normalizeText(
              row.estado
            );


          if (
            target ===
            "en seguimiento"
          ) {

            return (
              estado ===
              "seguimiento"
            );

          }


          if (
            target ===
            "cerrada"
          ) {

            return (
              estado ===
              "cerrada"
            );

          }


          if (
            target ===
            "oportunidad"
          ) {

            return (
              estado ===
              "oportunidad"
            );

          }


          return true;

        }
      );

  }


  /* =======================================================
     CUARTO NIVEL:
     SECTOR / RUBRO
     ======================================================= */

  if (
    selectedRubro &&
    selectedRubro !== "Todos"
  ) {

    const target =
      normalizeText(
        selectedRubro
      );


    result =
      result.filter(
        (row) => {

          const rubro =
            normalizeText(
              row.rubro
            );


          return (
            rubro ===
            target
          );

        }
      );

  }


  /* =======================================================
     QUINTO NIVEL:
     BÚSQUEDA
     ======================================================= */

  const search =
    normalizeText(
      searchTerm
    );


  if (search) {

    result =
      result.filter(
        (row) => {

          const searchable =
            [

              row.nacional,

              row.equipo,

              row.ejecutivo,

              row.cuenta,

              row.rubro,

              row.necesidad,

              row.necesidad1,

              row.necesidad2,

              row.necesidad3,

              row.oportunidad,

              row.estado,

              row.asesor,

              row.responsable,

              row.clave,

            ]

              .map(
                (value) =>
                  normalizeText(
                    value
                  )
              )

              .join(" ");


          return searchable.includes(
            search
          );

        }
      );

  }


  return result;

}


/* =========================================================
   MARCAS ÚNICAS
   ========================================================= */

function getUniqueBrands(
  rows = []
) {

  const brands =
    new Set();


  rows.forEach(
    (row) => {

      const brand =
        normalizeText(
          row.cuenta
        );


      if (brand) {

        brands.add(
          brand
        );

      }

    }
  );


  return brands;

}


/* =========================================================
   EJECUTIVOS ÚNICOS
   ========================================================= */

function getUniqueExecutives(
  rows = []
) {

  const executives =
    new Set();


  rows.forEach(
    (row) => {

      const executive =
        normalizeText(
          row.ejecutivo
        );


      if (executive) {

        executives.add(
          executive
        );

      }

    }
  );


  return executives;

}


/* =========================================================
   CONTAR MARCAS POR RUBRO
   ========================================================= */

function getBrandCountsByRubro(
  rows = []
) {

  const result =
    {};


  RUBRO_ORDER.forEach(
    (rubro) => {

      result[rubro] =
        new Set();

    }
  );


  rows.forEach(
    (row) => {

      const rubro =
        normalizeRubro(
          row.rubro
        );


      const brand =
        String(
          row.cuenta ?? ""
        ).trim();


      if (
        !rubro ||
        !brand
      ) {

        return;

      }


      /*
       * Si el Excel tiene un rubro
       * que coincide con nuestro catálogo,
       * lo usamos directamente.
       */

      const matchingRubro =
        RUBRO_ORDER.find(
          (item) =>
            normalizeText(
              item
            ) ===
            normalizeText(
              rubro
            )
        );


      if (
        matchingRubro &&
        result[
          matchingRubro
        ]
      ) {

        result[
          matchingRubro
        ].add(
          normalizeText(
            brand
          )
        );

      }

    }
  );


  /*
   * Convertimos Set → número.
   */

  const counts =
    {};


  RUBRO_ORDER.forEach(
    (rubro) => {

      counts[rubro] =
        result[rubro]
          ? result[rubro].size
          : 0;

    }
  );


  return counts;

}


/* =========================================================
   OBTENER SECTORES DISPONIBLES
   ========================================================= */

function getAvailableRubros(
  rows = []
) {

  const available =
    new Set();


  rows.forEach(
    (row) => {

      const rubro =
        normalizeRubro(
          row.rubro
        );


      if (
        rubro
      ) {

        const match =
          RUBRO_ORDER.find(
            (item) =>
              normalizeText(
                item
              ) ===
              normalizeText(
                rubro
              )
          );


        if (match) {

          available.add(
            match
          );

        }

      }

    }
  );


  return RUBRO_ORDER.filter(
    (rubro) =>
      available.has(
        rubro
      )
  );

}


/* =========================================================
   EQUIPOS / NACIONALES DISPONIBLES
   ========================================================= */

function getAvailableTeams(
  rows = []
) {

  const teams =
    new Set();


  rows.forEach(
    (row) => {

      const nacional =
        normalizeNacional(
          row.nacional
        );


      if (
        nacional
      ) {

        teams.add(
          nacional
        );

      }

    }
  );


  return [
    "Todos",

    ...Array.from(
      teams
    ).sort(
      (a, b) =>
        getNationalNumber(
          a
        ) -
        getNationalNumber(
          b
        )
    ),
  ];

}


/* =========================================================
   ESTADOS DISPONIBLES
   ========================================================= */

function getAvailableStatuses(
  rows = []
) {

  const states =
    new Set();


  rows.forEach(
    (row) => {

      if (
        row.estado ===
        "seguimiento"
      ) {

        states.add(
          "En seguimiento"
        );

      }


      if (
        row.estado ===
        "cerrada"
      ) {

        states.add(
          "Cerrada"
        );

      }


      if (
        row.estado ===
        "oportunidad"
      ) {

        states.add(
          "Oportunidad"
        );

      }

    }
  );


  return [
    "Todos",

    ...Array.from(
      states
    ),
  ];

}


/* =========================================================
   RESUMEN GENERAL
   ========================================================= */

function calculateSummary(
  rows = []
) {

  const brands =
    getUniqueBrands(
      rows
    );


  const executives =
    getUniqueExecutives(
      rows
    );


  const proposals =
    rows.length;


  const closedRows =
    rows.filter(
      (row) =>
        row.estado ===
        "cerrada"
    );


  const followUpRows =
    rows.filter(
      (row) =>
        row.estado ===
        "seguimiento"
    );


  const closedValue =
    closedRows.reduce(
      (sum, row) =>
        sum +
        toNumber(
          row.valorPropuesta
        ),
      0
    );


  const followUpValue =
    followUpRows.reduce(
      (sum, row) =>
        sum +
        toNumber(
          row.valorPropuesta
        ),
      0
    );


  const totalValue =
    rows.reduce(
      (sum, row) =>
        sum +
        toNumber(
          row.valorPropuesta
        ),
      0
    );


  return {

    brands:
      brands.size,

    executives:
      executives.size,

    proposals,

    closed:
      closedRows.length,

    followUp:
      followUpRows.length,

    closedValue,

    followUpValue,

    totalValue,

  };

}


/* =========================================================
   DATOS DE ESTADOS PARA GRÁFICA
   ========================================================= */

function calculateStatusData(
  rows = []
) {

  const counts = {

    seguimiento:
      0,

    cerrada:
      0,

    oportunidad:
      0,

  };


  rows.forEach(
    (row) => {

      if (
        counts[
          row.estado
        ] !== undefined
      ) {

        counts[
          row.estado
        ] += 1;

      }

    }
  );


  return [

    {

      name:
        "En seguimiento",

      key:
        "seguimiento",

      value:
        counts.seguimiento,

      color:
        COLORS.pink,

    },


    {

      name:
        "Cerrada",

      key:
        "cerrada",

      value:
        counts.cerrada,

      color:
        COLORS.green,

    },


    {

      name:
        "Oportunidad",

      key:
        "oportunidad",

      value:
        counts.oportunidad,

      color:
        COLORS.amber,

    },

  ];

}


/* =========================================================
   VALOR GESTIONADO POR NACIONAL
   ========================================================= */

function calculateNationalValueData(
  rows = []
) {

  return [

    "Nacional 1",

    "Nacional 2",

    "Nacional 3",

    "Nacional 4",

    "Nacional 5",

  ].map(
    (nacional) => {

      const nationalRows =
        rows.filter(
          (row) =>
            nacionalMatches(
              row.nacional,
              nacional
            )
        );


      const value =
        nationalRows.reduce(
          (sum, row) =>
            sum +
            toNumber(
              row.valorPropuesta
            ),
          0
        );


      return {

        nacional:
          nacional.replace(
            "Nacional ",
            "N"
          ),

        name:
          nacional,

        value,

        proposals:
          nationalRows.length,

      };

    }
  );

}


/* =========================================================
   TOP MARCAS POR VALOR
   ========================================================= */

function calculateTopBrands(
  rows = []
) {

  const brands =
    {};


  rows.forEach(
    (row) => {

      const brand =
        String(
          row.cuenta ?? ""
        ).trim();


      if (!brand) {

        return;

      }


      const key =
        normalizeText(
          brand
        );


      if (
        !brands[key]
      ) {

        brands[key] = {

          name:
            brand,

          value:
            0,

          proposals:
            0,

        };

      }


      brands[key].value +=
        toNumber(
          row.valorPropuesta
        );


      brands[key].proposals +=
        1;

    }
  );


  return Object.values(
    brands
  )

    .sort(
      (a, b) =>
        b.value -
        a.value
    )

    .slice(
      0,
      5
    );

}


/* =========================================================
   VALOR POR ESTADO
   ========================================================= */

function calculateValueByStatus(
  rows = []
) {

  const closed =
    rows
      .filter(
        (row) =>
          row.estado ===
          "cerrada"
      )
      .reduce(
        (sum, row) =>
          sum +
          toNumber(
            row.valorPropuesta
          ),
        0
      );


  const followUp =
    rows
      .filter(
        (row) =>
          row.estado ===
          "seguimiento"
      )
      .reduce(
        (sum, row) =>
          sum +
          toNumber(
            row.valorPropuesta
          ),
        0
      );


  return {

    closed,

    followUp,

  };

}


/* =========================================================
   FIN APP.JSX — PARTE 3/6
   ========================================================= */

   /* =========================================================
   APP.JSX — PARTE 4/6
   COMPONENTES VISUALES PRINCIPALES
   ========================================================= */


/* =========================================================
   AVATAR DE USUARIO
   ========================================================= */

function UserAvatar({
  user,
  size = "medium",
}) {

  if (!user) {
    return (
      <Avatar
        name="Usuario"
        initials="US"
        size={size}
      />
    );
  }


  return (
    <Avatar
      name={user.name}
      initials={user.initials}
      image={user.image}
      size={size}
    />
  );

}


/* =========================================================
   BADGE DE ESTADO
   ========================================================= */

function StatusBadge({
  estado,
}) {

  const meta =
    ESTADO_META[
      estado
    ] ||
    {
      label:
        estado ||
        "Sin estado",

      color:
        "#777c8e",

      soft:
        "rgba(119,124,142,0.12)",
    };


  return (
    <span
      className="status-badge"
      style={{
        color:
          meta.color,

        background:
          meta.soft,
      }}
    >
      {meta.label}
    </span>
  );

}


/* =========================================================
   KPI CARD
   ========================================================= */

function KpiCard({
  icon: Icon,
  label,
  value,
  sublabel,
}) {

  return (
    <div className="kpi-card">

      <div className="kpi-card-icon">

        {Icon && (
          <Icon
            size={16}
            strokeWidth={1.8}
          />
        )}

      </div>


      <div className="kpi-card-content">

        <span>
          {label}
        </span>

        <strong>
          {value}
        </strong>

        {sublabel && (
          <small>
            {sublabel}
          </small>
        )}

      </div>

    </div>
  );

}


/* =========================================================
   SIDEBAR
   ========================================================= */

function DashboardSidebar({
  activeSection,
  onSectionChange,

  selectedUser,
  onChangeUser,

  selectedTeam,
  onTeamChange,

  selectedStatus,
  onStatusChange,

  selectedRubro,
  onRubroChange,

  brandCountsByRubro,
}) {

  const [
    userMenuOpen,
    setUserMenuOpen,
  ] = useState(false);


  /*
   * Sectores que queremos mostrar
   * siempre en el mismo orden.
   */

  const sectors =
    RUBRO_ORDER;


  return (
    <aside className="dashboard-sidebar">

      {/* =================================================
         LOGO
         ================================================= */}

      <div className="sidebar-brand">

        <img
          src={`${IMAGE_PATH}PRISA.png`}
          alt="PRISA"
          className="sidebar-prisa-logo"
        />

      </div>


      {/* =================================================
         NAVEGACIÓN
         ================================================= */}

      <nav className="sidebar-nav">

        <button
          type="button"
          className={
            `sidebar-nav-item ${
              activeSection ===
              "resumen"
                ? "active"
                : ""
            }`
          }
          onClick={() => {

            onSectionChange(
              "resumen"
            );

            onRubroChange(
              "Todos"
            );

          }}
        >

          <LayoutGrid
            size={15}
          />

          <span>
            Resumen
          </span>

        </button>

      </nav>


      {/* =================================================
         FILTROS
         ================================================= */}

      <div className="sidebar-filters">

        {/* EQUIPO */}

        <div className="sidebar-filter-group">

          <div className="sidebar-filter-title">

            <span>
              EQUIPO
            </span>

          </div>


          <div className="sidebar-filter-select">

            <select
              value={
                selectedTeam
              }
              onChange={(event) =>
                onTeamChange(
                  event.target.value
                )
              }

              disabled={
                Boolean(
                  selectedUser?.filterTeam
                )
              }
            >

              {!selectedUser?.filterTeam && (
                <option value="Todos">
                  Todos
                </option>
              )}


              {[
                "Nacional 1",
                "Nacional 2",
                "Nacional 3",
                "Nacional 4",
                "Nacional 5",
              ].map(
                (team) => (
                  <option
                    key={team}
                    value={team}
                  >
                    {team}
                  </option>
                )
              )}

            </select>


            <ChevronDown
              size={13}
            />

          </div>

        </div>


        {/* ESTADO */}

        <div className="sidebar-filter-group">

          <div className="sidebar-filter-title">

            <span>
              ESTADO
            </span>

          </div>


          <div className="sidebar-filter-select">

            <select
              value={
                selectedStatus
              }
              onChange={(event) =>
                onStatusChange(
                  event.target.value
                )
              }
            >

              <option value="Todos">
                Todos
              </option>

              <option value="En seguimiento">
                En seguimiento
              </option>

              <option value="Cerrada">
                Cerrada
              </option>

              <option value="Oportunidad">
                Oportunidad
              </option>

            </select>


            <ChevronDown
              size={13}
            />

          </div>

        </div>

      </div>


      {/* =================================================
         SECTORES
         ================================================= */}

      <div className="sidebar-sectors">

        <div className="sidebar-section-title">

          <span>
            SECTORES
          </span>

          <ChevronDown
            size={12}
          />

        </div>


        <div className="sector-list">

          {sectors.map(
            (rubro) => {

              const Icon =
                RUBRO_ICONS[
                  rubro
                ] ||
                LayoutGrid;


              const count =
                brandCountsByRubro?.[
                  rubro
                ] ??
                0;


              const isActive =
                selectedRubro ===
                rubro;


              return (
                <button
                  type="button"
                  key={rubro}
                  className={
                    `sector-item ${
                      isActive
                        ? "active"
                        : ""
                    }`
                  }

                  onClick={() =>
                    onRubroChange(
                      isActive
                        ? "Todos"
                        : rubro
                    )
                  }
                >

                  <span className="sector-icon">

                    <Icon
                      size={14}
                      strokeWidth={1.8}
                    />

                  </span>


                  <span className="sector-name">
                    {rubro}
                  </span>


                  <span className="sector-count">
                    {count}
                  </span>

                </button>
              );

            }
          )}

        </div>

      </div>

    </aside>
  );

}


/* =========================================================
   TOPBAR
   ========================================================= */

function DashboardTopbar({
  currentUser,
  searchTerm,
  onSearchChange,
}) {

  return (
    <header className="dashboard-topbar">

      <div className="topbar-left">

        <div className="topbar-title">

          <span>
            PRISA MEDIA
          </span>

          <ChevronRight
            size={12}
          />

          <strong>
            Dashboard Comercial
          </strong>

        </div>

      </div>


      <div className="topbar-center">

        <label className="topbar-search">

          <Search
            size={14}
          />

          <input
            type="search"
            value={
              searchTerm
            }
            onChange={(event) =>
              onSearchChange(
                event.target.value
              )
            }
            placeholder="Buscar marca, ejecutivo, asesor..."
          />

        </label>

      </div>


      <div className="topbar-right">

        <button
          type="button"
          className="topbar-icon-button"
          title="Ayuda"
        >

          <HelpCircle
            size={15}
          />

        </button>


        <button
          type="button"
          className="topbar-icon-button"
          title="Notificaciones"
        >

          <Bell
            size={15}
          />

        </button>


        <div className="topbar-user">

          <UserAvatar
            user={
              currentUser
            }
            size="small"
          />


          <div className="topbar-user-info">

            <strong>
              {currentUser?.name ||
                "Usuario"}
            </strong>

            <span>
              {currentUser?.role ||
                ""}
            </span>

          </div>

        </div>

      </div>

    </header>
  );

}


/* =========================================================
   EQUIPO DE INNOVACIÓN DIGITAL
   ========================================================= */

function InnovationTeamSection({
  selectedTeam,
}) {

  /*
   * El director siempre aparece.
   */

  const director =
    INNOVATION_TEAM[0];


  /*
   * Los miembros se mantienen visibles
   * como en el diseño original.
   */

  const members =
    INNOVATION_TEAM.slice(
      1
    );


  return (
    <section className="innovation-section">

      <div className="innovation-section-header">

        <div>

          <span className="eyebrow">
            EQUIPO
          </span>

          <h2>
            Innovación Digital
          </h2>

        </div>


        <span aria-hidden="true"></span>

      </div>


      {/* DIRECTOR */}

      <div className="innovation-director-card">

        <UserAvatar
          user={
            findUserByName(
              director.name
            )
          }
          size="large"
        />


        <div className="innovation-director-info">

          <strong>
            {director.name}
          </strong>

          <span className="innovation-director-role">
            {director.role}
          </span>

          <p>
            {director.desc}
          </p>

        </div>


        <span className="innovation-director-badge">
          INNOVACIÓN DIGITAL
        </span>

      </div>


      {/* MIEMBROS */}

      <div className="innovation-members-grid">

        {members.map(
          (member) => {

            const user =
              findUserByName(
                member.name
              );


            return (
              <div
                className="innovation-member-card"
                key={
                  member.name
                }
              >

                <UserAvatar
                  user={
                    user
                  }
                  size="medium"
                />


                <div className="innovation-member-info">

                  <strong>
                    {member.name}
                  </strong>

                  <span>
                    {member.role}
                  </span>

                </div>

              </div>
            );

          }
        )}

      </div>

    </section>
  );

}


/* =========================================================
   EQUIPOS NACIONALES
   ========================================================= */

function NationalTeamSection({
  rows = [],
  selectedTeam,
  onOpenExecutive,
}) {

  const [
    expandedNational,
    setExpandedNational,
  ] = useState(null);


  /*
   * Los usuarios con acceso total pueden ver las cinco Nacionales.
   * Un líder nacional solamente recibe sus filas en `rows`, por lo
   * que nunca podrá consultar ejecutivos de otra Nacional.
   */
  const visibleTeams =
    selectedTeam &&
    selectedTeam !== "Todos"
      ? NATIONAL_TEAMS.filter(
          (team) =>
            nacionalMatches(
              team.national,
              selectedTeam
            )
        )
      : NATIONAL_TEAMS;


  useEffect(() => {
    setExpandedNational(null);
  }, [selectedTeam]);


  function getExecutivesForNational(
    national
  ) {
    const unique = new Map();

    rows
      .filter(
        (row) =>
          nacionalMatches(
            row.nacional,
            national
          )
      )
      .forEach((row) => {
        const name =
          String(
            row.ejecutivo ?? ""
          ).trim();

        const key =
          normalizeText(name);

        if (key && !unique.has(key)) {
          unique.set(key, name);
        }
      });

    return Array.from(unique.values()).sort(
      (a, b) =>
        normalizeText(a).localeCompare(
          normalizeText(b),
          "es"
        )
    );
  }


  return (
    <section className="national-team-section">

      <div className="section-divider">

        <span />

        <strong>
          NACIONALES
        </strong>

        <span />

      </div>


      <div className="national-team-grid">

        {visibleTeams.map(
          (team) => {

            const teamRows =
              rows.filter(
                (row) =>
                  nacionalMatches(
                    row.nacional,
                    team.national
                  )
              );

            const executives =
              getExecutivesForNational(
                team.national
              );

            const isExpanded =
              expandedNational ===
              team.national;

            return (
              <div
                className={
                  `national-team-block ${
                    isExpanded
                      ? "expanded"
                      : ""
                  }`
                }
                key={
                  team.national
                }
              >

                <button
                  type="button"
                  className="national-member-card"
                  onClick={() =>
                    setExpandedNational(
                      isExpanded
                        ? null
                        : team.national
                    )
                  }
                  aria-expanded={
                    isExpanded
                  }
                >

                  <UserAvatar
                    user={
                      findUserByName(
                        team.name
                      )
                    }
                    size="medium"
                  />


                  <strong>
                    {team.name}
                  </strong>

                  <span>
                    {team.role}
                  </span>

                  <small>
                    {teamRows.length} propuestas
                  </small>

                </button>


                {isExpanded && (
                  <div className="national-executives-panel">

                    <div className="national-executives-header">
                      <span>
                        EJECUTIVOS
                      </span>

                      <strong>
                        {executives.length}
                      </strong>
                    </div>


                    {executives.length > 0 ? (
                      <div className="national-executives-grid">

                        {executives.map(
                          (executive) => {
                            const executiveRows =
                              teamRows.filter(
                                (row) =>
                                  normalizeText(
                                    row.ejecutivo
                                  ) ===
                                  normalizeText(
                                    executive
                                  )
                              );

                            return (
                              <button
                                type="button"
                                className="national-executive-card"
                                key={
                                  executive
                                }
                                onClick={() =>
                                  onOpenExecutive(
                                    executive
                                  )
                                }
                              >
                                <div className="national-executive-avatar">
                                  {getInitials(
                                    executive
                                  )}
                                </div>

                                <div className="national-executive-info">
                                  <strong>
                                    {executive}
                                  </strong>
                                  <span>
                                    Ejecutivo(a) Comercial
                                  </span>
                                </div>

                                <small>
                                  {executiveRows.length} propuestas
                                </small>
                              </button>
                            );
                          }
                        )}

                      </div>
                    ) : (
                      <div className="national-executives-empty">
                        No hay ejecutivos registrados en esta Nacional.
                      </div>
                    )}

                  </div>
                )}

              </div>
            );
          }
        )}

      </div>

    </section>
  );

}


/* =========================================================
   DETALLE DE EJECUTIVO
   ========================================================= */

function ExecutiveDetail({
  executiveName,
  rows = [],
  onBack,
  onOpenProposal,
}) {

  const executiveRows =
    rows.filter(
      (row) =>
        normalizeText(
          row.ejecutivo
        ) ===
        normalizeText(
          executiveName
        )
    );

  if (executiveRows.length === 0) {
    return (
      <div className="dashboard-panel executive-detail-empty">
        <button
          type="button"
          className="executive-detail-back"
          onClick={onBack}
        >
          <ChevronLeft size={15} />
          Volver a Nacionales
        </button>

        <strong>
          No hay información para este ejecutivo.
        </strong>
      </div>
    );
  }


  const brands =
    getUniqueBrands(
      executiveRows
    );

  const activeRows =
    executiveRows.filter(
      (row) =>
        row.estado !== "cerrada"
    );

  const totalValue =
    executiveRows.reduce(
      (sum, row) =>
        sum +
        toNumber(
          row.valorPropuesta
        ),
      0
    );

  const selectedAccount =
    executiveRows[0];

  const accountAdvisor =
    getAdvisorData(
      selectedAccount?.asesor
    );

  return (
    <section className="executive-detail-section">

      <button
        type="button"
        className="executive-detail-back"
        onClick={onBack}
      >
        <ChevronLeft size={15} />
        Volver a Nacionales
      </button>


      <div className="executive-detail-header">

        <div className="executive-detail-user">
          <div className="executive-detail-avatar">
            {getInitials(
              executiveName
            )}
          </div>

          <div>
            <strong>
              {executiveName}
            </strong>
            <span>
              Ejecutivo(a) Comercial
            </span>
            <small>
              {selectedAccount?.nacional || ""}
            </small>
          </div>
        </div>


        <div className="executive-detail-metrics">
          <div>
            <span>Marcas totales</span>
            <strong>{brands.size}</strong>
          </div>

          <div>
            <span>Propuestas activas</span>
            <strong>{activeRows.length}</strong>
          </div>

          <div>
            <span>Solicitudes</span>
            <strong>{executiveRows.length}</strong>
          </div>

          <div>
            <span>Valor gestionado</span>
            <strong>{formatMoneyShort(totalValue)}</strong>
          </div>
        </div>

      </div>


      <div className="executive-detail-layout">

        <div className="dashboard-panel executive-proposals-panel">

          <div className="dashboard-panel-header">
            <div>
              <span>
                EJECUTIVO
              </span>
              <h3>
                Marcas y cuentas asignadas
              </h3>
            </div>

            <span>
              {executiveRows.length} propuestas
            </span>
          </div>


          <div className="proposal-table">

            <div className="proposal-table-header executive-proposal-table-header">
              <div>MARCA</div>
              <div>SECTOR</div>
              <div>PROPUESTA</div>
              <div>ESTADO</div>
              <div>VALOR</div>
              <div>ASESOR</div>
            </div>


            <div className="proposal-table-body">
              {executiveRows.map(
                (row) => {
                  const advisor =
                    getAdvisorData(
                      row.asesor
                    );

                  return (
                    <button
                      type="button"
                      className="executive-proposal-row"
                      key={row.id}
                      onClick={() =>
                        onOpenProposal(row)
                      }
                    >
                      <div>
                        <strong>
                          {row.cuenta || "—"}
                        </strong>
                      </div>

                      <div>
                        {row.rubro || "—"}
                      </div>

                      <div className="executive-proposal-text">
                        {row.necesidad ||
                          row.oportunidad ||
                          "—"}
                      </div>

                      <div>
                        <StatusBadge
                          estado={row.estado}
                        />
                      </div>

                      <div>
                        <strong>
                          {formatMoneyShort(
                            row.valorPropuesta
                          )}
                        </strong>
                      </div>

                      <div>
                        <div className="proposal-table-advisor">
                          <Avatar
                            name={advisor.name}
                            initials={advisor.initials}
                            image={advisor.image}
                            size="small"
                          />
                          <span>
                            {advisor.name}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                }
              )}
            </div>

          </div>

        </div>


        <aside className="executive-account-card">
          <div className="executive-account-title">
            <strong>
              Resumen de cuenta
            </strong>
          </div>

          <div className="executive-account-brand">
            <div className="executive-account-avatar">
              {getInitials(
                selectedAccount?.cuenta
              )}
            </div>
            <strong>
              {selectedAccount?.cuenta || "Sin cuenta"}
            </strong>
          </div>

          <StatusBadge
            estado={
              selectedAccount?.estado
            }
          />

          <div className="executive-account-item">
            <span>Necesidad principal</span>
            <strong>
              {selectedAccount?.necesidad ||
                selectedAccount?.oportunidad ||
                "Sin información"}
            </strong>
          </div>

          <div className="executive-account-item">
            <span>Realizado por (Innovación Digital)</span>
            <strong>
              {accountAdvisor.name}
            </strong>
          </div>

          <div className="executive-account-item">
            <span>Valor de la propuesta</span>
            <strong>
              {formatCurrency(
                selectedAccount?.valorPropuesta
              )}
            </strong>
          </div>

          <div className="executive-account-item">
            <span>Prioridad</span>
            <strong>
              {selectedAccount?.prioridad || "—"}
            </strong>
          </div>

          <div className="executive-account-item">
            <span>Mes</span>
            <strong>
              {selectedAccount?.mes || "—"}
            </strong>
          </div>
        </aside>

      </div>

    </section>
  );
}


/* =========================================================
   FIN APP.JSX — PARTE 4/6
   ========================================================= */

/* =========================================================
   APP.JSX — PARTE 5/6
   RESUMEN + VISTA DE SECTORES + GRÁFICAS + TABLA
   ========================================================= */


/* =========================================================
   TOOLTIP PERSONALIZADO
   ========================================================= */

function CustomTooltip({
  active,
  payload,
  label,
}) {

  if (
    !active ||
    !payload ||
    payload.length === 0
  ) {
    return null;
  }


  return (
    <div className="chart-tooltip">

      {label && (
        <strong>
          {label}
        </strong>
      )}


      {payload.map(
        (item, index) => (

          <div
            key={
              `${item.name}-${index}`
            }
          >

            <span>
              {item.name}
            </span>

            <b>
              {typeof item.value ===
              "number"
                ? formatMoneyShort(
                    item.value
                  )
                : item.value}
            </b>

          </div>

        )
      )}

    </div>
  );

}


/* =========================================================
   TABLA DE PROPUESTAS
   ========================================================= */

function ProposalTable({
  rows = [],
  onOpenProposal,
}) {

  if (
    rows.length === 0
  ) {

    return (
      <div className="dashboard-panel">

        <div className="empty-state">

          <FileText
            size={25}
          />

          <strong>
            No hay propuestas
          </strong>

          <span>
            No encontramos propuestas
            que coincidan con los
            filtros seleccionados.
          </span>

        </div>

      </div>
    );

  }


  return (
    <div className="dashboard-panel">

      <div className="dashboard-panel-header">

        <div>

          <span>
            DETALLE
          </span>

          <h3>
            Ejecutivos, marcas y propuestas
          </h3>

        </div>


        <span>
          {rows.length} propuestas
        </span>

      </div>


      <div className="proposal-table">

        <div className="proposal-table-header">

          <div>
            EJECUTIVO
          </div>

          <div>
            NACIONAL
          </div>

          <div>
            MARCA
          </div>

          <div>
            NECESIDAD / PROPUESTA
          </div>

          <div>
            ESTADO
          </div>

          <div>
            VALOR
          </div>

          <div>
            ASESOR
          </div>

        </div>


        <div className="proposal-table-body">

          {rows.map(
            (row) => {

              const advisor =
                getAdvisorData(
                  row.asesor
                );


              return (
                <div
                  className="proposal-table-row"
                  key={
                    row.id
                  }
                >

                  {/* EJECUTIVO */}

                  <div>

                    <strong>
                      {row.ejecutivo ||
                        "—"}
                    </strong>

                  </div>


                  {/* NACIONAL */}

                  <div>

                    {row.nacional ||
                      "—"}

                  </div>


                  {/* MARCA */}

                  <div>

                    <strong>
                      {row.cuenta ||
                        "—"}
                    </strong>

                  </div>


                  {/* PROPUESTA */}

                  <div>

                    <div className="proposal-table-need">

                      {row.necesidad ||
                        row.oportunidad ||
                        "—"}

                    </div>

                  </div>


                  {/* ESTADO */}

                  <div>

                    <StatusBadge
                      estado={
                        row.estado
                      }
                    />

                  </div>


                  {/* VALOR */}

                  <div>

                    <strong>
                      {formatMoneyShort(
                        row.valorPropuesta
                      )}
                    </strong>

                  </div>


                  {/* ASESOR */}

                  <div>

                    <div className="proposal-table-advisor">

                      <Avatar
                        name={
                          advisor.name
                        }
                        initials={
                          advisor.initials
                        }
                        image={
                          advisor.image
                        }
                        size="small"
                      />


                      <span>
                        {advisor.name}
                      </span>

                    </div>

                  </div>

                </div>
              );

            }
          )}

        </div>

      </div>

    </div>
  );

}


/* =========================================================
   HEADER DE FILTROS ACTIVOS
   ========================================================= */

function ActiveFilters({
  selectedTeam,
  selectedStatus,
  selectedRubro,
  onClear,
}) {

  const filters = [];


  if (
    selectedTeam &&
    selectedTeam !== "Todos"
  ) {

    filters.push(
      selectedTeam
    );

  }


  if (
    selectedStatus &&
    selectedStatus !== "Todos"
  ) {

    filters.push(
      selectedStatus
    );

  }


  if (
    selectedRubro &&
    selectedRubro !== "Todos"
  ) {

    filters.push(
      selectedRubro
    );

  }


  if (
    filters.length === 0
  ) {

    return null;

  }


  return (
    <div className="active-filters-bar">

      <div className="active-filter-chips">

        <span>
          FILTROS ACTIVOS
        </span>


        {filters.map(
          (filter) => (

            <span
              className="active-filter-chip"
              key={filter}
            >
              {filter}
            </span>

          )
        )}

      </div>


      <button
        type="button"
        className="clear-filters-button"

        onClick={
          onClear
        }
      >
        Limpiar filtros
      </button>

    </div>
  );

}


/* =========================================================
   RESUMEN GENERAL
   ========================================================= */

function SummaryView({
  rows,
  selectedTeam,
  selectedStatus,
  selectedRubro,
  onOpenProposal,
}) {

  const summary =
    useMemo(
      () =>
        calculateSummary(
          rows
        ),
      [rows]
    );


  const statusData =
    useMemo(
      () =>
        calculateStatusData(
          rows
        ),
      [rows]
    );


  const nationalData =
    useMemo(
      () =>
        calculateNationalValueData(
          rows
        ),
      [rows]
    );


  const topBrands =
    useMemo(
      () =>
        calculateTopBrands(
          rows
        ),
      [rows]
    );


  return (
    <div className="dashboard-page">

      {/* =================================================
         HEADER
         ================================================= */}

      <div className="dashboard-page-header">

        <div>

          <span className="eyebrow">
            RESUMEN COMERCIAL
          </span>

          <h1>
            Dashboard Comercial
          </h1>

          <p>
            Seguimiento de propuestas,
            marcas y gestión comercial.
          </p>

        </div>

      </div>


      {/* =================================================
         FILTROS
         ================================================= */}

      <ActiveFilters
        selectedTeam={
          selectedTeam
        }

        selectedStatus={
          selectedStatus
        }

        selectedRubro={
          selectedRubro
        }

        onClear={() => {}}
      />


      {/* =================================================
         KPIs
         ================================================= */}

      <div className="summary-kpi-grid">

        <KpiCard
          icon={
            Users
          }

          label="Marcas activas"

          value={
            summary.brands
          }

          sublabel="Marcas únicas"
        />


        <KpiCard
          icon={
            FileText
          }

          label="Propuestas desarrolladas"

          value={
            summary.proposals
          }

          sublabel="Registros del Excel"
        />


        <KpiCard
          icon={
            CheckCircle2
          }

          label="Valor propuestas cerradas"

          value={
            formatMoneyShort(
              summary.closedValue
            )
          }

          sublabel={
            `${summary.closed} cerradas`
          }
        />


        <KpiCard
          icon={
            TrendingUp
          }

          label="Valor propuestas en seguimiento"

          value={
            formatMoneyShort(
              summary.followUpValue
            )
          }

          sublabel={
            `${summary.followUp} en seguimiento`
          }
        />

      </div>


      {/* =================================================
         GRÁFICAS
         ================================================= */}

      <div className="stats-grid">

        {/* ESTADOS */}

        <div className="dashboard-panel stats-panel">

          <div className="dashboard-panel-header">

            <div>

              <span>
                ESTADO
              </span>

              <h3>
                Distribución de propuestas
              </h3>

            </div>

          </div>


          <div className="rubro-donut-area">

            <ResponsiveContainer
              width="100%"
              height={210}
            >

              <PieChart>

                <Pie
                  data={
                    statusData
                  }

                  dataKey="value"

                  nameKey="name"

                  cx="50%"

                  cy="50%"

                  innerRadius={55}

                  outerRadius={82}

                  paddingAngle={3}
                >

                  {statusData.map(
                    (item) => (

                      <Cell
                        key={
                          item.key
                        }

                        fill={
                          item.color
                        }
                      />

                    )
                  )}

                </Pie>


                <Tooltip
                  content={
                    <CustomTooltip />
                  }
                />

              </PieChart>

            </ResponsiveContainer>


            <div className="rubro-status-list">

              {statusData.map(
                (item) => (

                  <div
                    className="rubro-status-item"
                    key={
                      item.key
                    }
                  >

                    <span
                      className="rubro-status-dot"

                      style={{
                        background:
                          item.color,
                      }}
                    />


                    <span>
                      {item.name}
                    </span>


                    <strong>
                      {item.value}
                    </strong>

                  </div>

                )
              )}

            </div>

          </div>

        </div>


        {/* NACIONALES */}

        <div className="dashboard-panel stats-panel">

          <div className="dashboard-panel-header">

            <div>

              <span>
                VALOR
              </span>

              <h3>
                Valor gestionado por Nacional
              </h3>

            </div>

          </div>


          <div className="rubro-national-chart">

            <ResponsiveContainer
              width="100%"
              height={220}
            >

              <LineChart
                data={
                  nationalData
                }

                margin={{
                  top: 10,
                  right: 10,
                  left: 5,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="nacional"
                />

                <YAxis
                  tickFormatter={
                    formatMoneyShort
                  }
                />

                <Tooltip
                  content={
                    <CustomTooltip />
                  }
                />

                <Line
                  type="monotone"

                  dataKey="value"

                  name="Valor"

                  stroke={
                    COLORS.pink
                  }

                  strokeWidth={2}

                  dot={{
                    r: 3,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>


      {/* =================================================
         TOP MARCAS
         ================================================= */}

      <div className="dashboard-panel">

        <div className="dashboard-panel-header">

          <div>

            <span>
              MARCAS
            </span>

            <h3>
              Principales marcas por valor
            </h3>

          </div>

        </div>


        <div className="top-brands-list">

          {topBrands.length ===
          0 ? (

            <div className="empty-state">

              <span>
                No hay marcas para
                mostrar.
              </span>

            </div>

          ) : (

            topBrands.map(
              (brand, index) => (

                <div
                  className="top-brand-item"
                  key={
                    brand.name
                  }
                >

                  <span className="top-brand-position">
                    {index + 1}
                  </span>


                  <div className="top-brand-info">

                    <strong>
                      {brand.name}
                    </strong>

                    <span>
                      {brand.proposals}
                      {" "}
                      propuestas
                    </span>

                  </div>


                  <strong>
                    {formatMoneyShort(
                      brand.value
                    )}
                  </strong>

                </div>

              )
            )

          )}

        </div>

      </div>


      {/* =================================================
         TABLA
         ================================================= */}

      <div
        style={{
          marginTop: 10,
        }}
      >

        <ProposalTable
          rows={
            rows
          }

          onOpenProposal={
            onOpenProposal
          }
        />

      </div>

    </div>
  );

}


/* =========================================================
   VISTA DE SECTOR
   ========================================================= */

function RubroView({
  rubro,
  rows,
  selectedTeam,
  selectedStatus,
  onOpenProposal,
}) {

  const summary =
    useMemo(
      () =>
        calculateSummary(
          rows
        ),
      [rows]
    );


  const statusData =
    useMemo(
      () =>
        calculateStatusData(
          rows
        ),
      [rows]
    );


  const nationalData =
    useMemo(
      () =>
        calculateNationalValueData(
          rows
        ),
      [rows]
    );


  const topBrands =
    useMemo(
      () =>
        calculateTopBrands(
          rows
        ),
      [rows]
    );


  const Icon =
    RUBRO_ICONS[
      rubro
    ] ||
    LayoutGrid;


  return (
    <div className="rubro-view">

      {/* =================================================
         HEADER
         ================================================= */}

      <div className="rubro-view-header">

        <div>

          <div className="rubro-view-header">

            <div>

              <div className="rubro-title-icon">

                <Icon
                  size={20}
                />

              </div>


              <div>

                <span className="eyebrow">
                  SECTOR
                </span>

                <h1>
                  {rubro}
                </h1>

              </div>

            </div>

          </div>

        </div>


        <span className="rubro-record-count">

          {rows.length}

          {" "}

          {rows.length ===
          1
            ? "propuesta"
            : "propuestas"}

        </span>

      </div>


      {/* =================================================
         KPIs — EXACTAMENTE LOS SOLICITADOS
         ================================================= */}

      <div className="rubro-kpi-grid">

        <KpiCard
          icon={
            Users
          }

          label="Ejecutivos relacionados"

          value={
            summary.executives
          }

          sublabel="Ejecutivos únicos"
        />


        <KpiCard
          icon={
            Tag
          }

          label="Marcas activas"

          value={
            summary.brands
          }

          sublabel="Marcas únicas"
        />


        <KpiCard
          icon={
            FileText
          }

          label="Propuestas desarrolladas"

          value={
            summary.proposals
          }

          sublabel="Propuestas del rubro"
        />


        <KpiCard
          icon={
            DollarSign
          }

          label="Valor total gestionado"

          value={
            formatMoneyShort(
              summary.totalValue
            )
          }

          sublabel="Valor de propuestas"
        />

      </div>


      {/* =================================================
         GRÁFICAS
         ================================================= */}

      <div className="rubro-chart-grid">

        {/* -------------------------------------------------
           DISTRIBUCIÓN DEL RUBRO
           ------------------------------------------------- */}

        <div className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>

              <span>
                DISTRIBUCIÓN DEL RUBRO
              </span>

              <h3>
                Estado de las propuestas
              </h3>

            </div>

          </div>


          <div className="rubro-donut-area">

            <ResponsiveContainer
              width="100%"
              height={220}
            >

              <PieChart>

                <Pie
                  data={
                    statusData
                  }

                  dataKey="value"

                  nameKey="name"

                  cx="50%"

                  cy="50%"

                  innerRadius={58}

                  outerRadius={84}

                  paddingAngle={3}
                >

                  {statusData.map(
                    (item) => (

                      <Cell
                        key={
                          item.key
                        }

                        fill={
                          item.color
                        }
                      />

                    )
                  )}

                </Pie>


                <Tooltip
                  content={
                    <CustomTooltip />
                  }
                />

              </PieChart>

            </ResponsiveContainer>


            <div className="rubro-status-list">

              {statusData.map(
                (item) => (

                  <div
                    className="rubro-status-item"
                    key={
                      item.key
                    }
                  >

                    <span
                      className="rubro-status-dot"

                      style={{
                        background:
                          item.color,
                      }}
                    />


                    <span>
                      {item.name}
                    </span>


                    <strong>
                      {item.value}
                    </strong>

                  </div>

                )
              )}

            </div>

          </div>

        </div>


        {/* -------------------------------------------------
           VALOR GESTIONADO POR NACIONAL
           ------------------------------------------------- */}

        <div className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>

              <span>
                VALOR GESTIONADO
              </span>

              <h3>
                Valor gestionado por Nacional
              </h3>

            </div>

          </div>


          <div className="rubro-national-chart">

            <ResponsiveContainer
              width="100%"
              height={220}
            >

              <LineChart
                data={
                  nationalData
                }

                margin={{
                  top: 10,
                  right: 12,
                  left: 4,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="nacional"
                />

                <YAxis
                  tickFormatter={
                    formatMoneyShort
                  }
                />

                <Tooltip
                  content={
                    <CustomTooltip />
                  }
                />

                <Line
                  type="monotone"

                  dataKey="value"

                  name="Valor"

                  stroke={
                    COLORS.pink
                  }

                  strokeWidth={2}

                  dot={{
                    r: 3,
                  }}

                  activeDot={{
                    r: 5,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>


      {/* =================================================
         TABLA DEL SECTOR
         ================================================= */}

      <ProposalTable
        rows={
          rows
        }

        onOpenProposal={
          onOpenProposal
        }
      />


      {/* =================================================
         TOP MARCAS
         ================================================= */}

      <div
        className="dashboard-panel"
        style={{
          marginTop: 10,
        }}
      >

        <div className="dashboard-panel-header">

          <div>

            <span>
              MARCAS
            </span>

            <h3>
              Marcas de {rubro}
            </h3>

          </div>

        </div>


        <div className="top-brands-list">

          {topBrands.length ===
          0 ? (

            <div className="empty-state">

              <span>
                No hay marcas
                disponibles.
              </span>

            </div>

          ) : (

            topBrands.map(
              (brand, index) => (

                <div
                  className="top-brand-item"
                  key={
                    brand.name
                  }
                >

                  <span className="top-brand-position">
                    {index + 1}
                  </span>


                  <div className="top-brand-info">

                    <strong>
                      {brand.name}
                    </strong>

                    <span>
                      {brand.proposals}
                      {" "}
                      propuestas
                    </span>

                  </div>


                  <strong>
                    {formatMoneyShort(
                      brand.value
                    )}
                  </strong>

                </div>

              )
            )

          )}

        </div>

      </div>

    </div>
  );

}


/* =========================================================
   FIN APP.JSX — PARTE 5/6
   ========================================================= */
   
   /* =========================================================
   APP.JSX — PARTE 6/6
   APP PRINCIPAL + CARGA EXCEL + MODAL + RENDER
   ========================================================= */


/* =========================================================
   MODAL DE PROPUESTA
   ========================================================= */

function ProposalModal({
  row,
  onClose,
}) {

  if (!row) {
    return null;
  }


  const advisor =
    getAdvisorData(
      row.asesor
    );


  return (
    <div
      className="proposal-modal-overlay"

      onMouseDown={(event) => {

        if (
          event.target ===
          event.currentTarget
        ) {

          onClose();

        }

      }}
    >

      <div className="proposal-modal">

        {/* HEADER */}

        <div className="proposal-modal-header">

          <div>

            <span>
              DETALLE DE PROPUESTA
            </span>

            <h2>
              {row.cuenta ||
                "Propuesta"}
            </h2>

          </div>


          <button
            type="button"
            onClick={
              onClose
            }
            aria-label="Cerrar"
          >

            <X
              size={17}
            />

          </button>

        </div>


        {/* BODY */}

        <div className="proposal-modal-body">

          {/* INFORMACIÓN PRINCIPAL */}

          <div className="proposal-detail-grid">

            <div className="proposal-detail-item">

              <span>
                Ejecutivo
              </span>

              <strong>
                {row.ejecutivo ||
                  "—"}
              </strong>

            </div>


            <div className="proposal-detail-item">

              <span>
                Nacional
              </span>

              <strong>
                {row.nacional ||
                  "—"}
              </strong>

            </div>


            <div className="proposal-detail-item">

              <span>
                Marca
              </span>

              <strong>
                {row.cuenta ||
                  "—"}
              </strong>

            </div>


            <div className="proposal-detail-item">

              <span>
                Sector
              </span>

              <strong>
                {row.rubro ||
                  "—"}
              </strong>

            </div>


            <div className="proposal-detail-item">

              <span>
                Estado
              </span>

              <StatusBadge
                estado={
                  row.estado
                }
              />

            </div>


            <div className="proposal-detail-item">

              <span>
                Valor de la propuesta
              </span>

              <strong>
                {formatCurrency(
                  row.valorPropuesta
                )}
              </strong>

            </div>


            {/* ASESOR */}

            <div
              className="proposal-detail-item"
              style={{
                gridColumn:
                  "1 / -1",
              }}
            >

              <span>
                Asesor Innovación Digital
              </span>


              <div className="proposal-detail-advisor">

                <Avatar
                  name={
                    advisor.name
                  }

                  initials={
                    advisor.initials
                  }

                  image={
                    advisor.image
                  }

                  size="small"
                />


                <strong>
                  {advisor.name}
                </strong>

              </div>

            </div>

          </div>


          {/* NECESIDAD */}

          <div className="proposal-detail-section">

            <span>
              NECESIDAD / PROPUESTA
            </span>

            <p>
              {row.necesidad ||
                row.oportunidad ||
                "Sin información"}
            </p>

          </div>


          {/* OPORTUNIDAD */}

          {row.oportunidad && (

            <div className="proposal-detail-section">

              <span>
                OPORTUNIDAD
              </span>

              <p>
                {row.oportunidad}
              </p>

            </div>

          )}


          {/* PLAN DE ACCIÓN */}

          {(
            row.planAccion1 ||
            row.planAccion2 ||
            row.planAccion3
          ) && (

            <div className="proposal-detail-section">

              <span>
                PLAN DE ACCIÓN
              </span>


              {row.planAccion1 && (
                <p>
                  {row.planAccion1}
                </p>
              )}


              {row.planAccion2 && (
                <p
                  style={{
                    marginTop: 7,
                  }}
                >
                  {row.planAccion2}
                </p>
              )}


              {row.planAccion3 && (
                <p
                  style={{
                    marginTop: 7,
                  }}
                >
                  {row.planAccion3}
                </p>
              )}

            </div>

          )}


          {/* FECHAS */}

          {(row.fechaSolicitud ||
            row.fechaEntrega) && (

            <div className="proposal-detail-grid">

              <div className="proposal-detail-item">

                <span>
                  Fecha solicitud
                </span>

                <strong>
                  {formatDate(
                    row.fechaSolicitud
                  )}
                </strong>

              </div>


              <div className="proposal-detail-item">

                <span>
                  Fecha entrega
                </span>

                <strong>
                  {formatDate(
                    row.fechaEntrega
                  )}
                </strong>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );

}


/* =========================================================
   APP PRINCIPAL
   ========================================================= */

export default function App() {

  /* =======================================================
     DATOS
     ======================================================= */

  const [
    rows,
    setRows,
  ] = useState([]);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState("");


  /* =======================================================
     USUARIO
     ======================================================= */

  const [selectedUser, setSelectedUser] = useState(null);

const [authenticatedUser, setAuthenticatedUser] = useState(null);

const [loginPassword, setLoginPassword] = useState("");

const [loginError, setLoginError] = useState("");

const [loginLoading, setLoginLoading] = useState(false);

const [showLogin, setShowLogin] = useState(false);

const [showChangePassword, setShowChangePassword] = useState(false);

const [newPassword, setNewPassword] = useState("");

const [confirmPassword, setConfirmPassword] = useState("");

const [changePasswordError, setChangePasswordError] = useState("");

  /* =======================================================
     NAVEGACIÓN
     ======================================================= */

  const [
    activeSection,
    setActiveSection,
  ] = useState(
    "resumen"
  );


  /* =======================================================
     FILTRO NACIONAL
     ======================================================= */

  const [
    selectedTeam,
    setSelectedTeam,
  ] = useState(
    "Todos"
  );


  /* =======================================================
     FILTRO ESTADO
     ======================================================= */

  const [
    selectedStatus,
    setSelectedStatus,
  ] = useState(
    "Todos"
  );


  /* =======================================================
     FILTRO SECTOR
     ======================================================= */

  const [
    selectedRubro,
    setSelectedRubro,
  ] = useState(
    "Todos"
  );


  /* =======================================================
     BUSCADOR
     ======================================================= */

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");


  /* =======================================================
     MODAL
     ======================================================= */

  const [
    selectedProposal,
    setSelectedProposal,
  ] = useState(null);


  /* =======================================================
     EJECUTIVO SELECCIONADO
     ======================================================= */

  const [
    selectedExecutive,
    setSelectedExecutive,
  ] = useState(null);


  /* =======================================================
     SIDEBAR MOBILE
     ======================================================= */

  const [
    mobileSidebarOpen,
    setMobileSidebarOpen,
  ] = useState(false);


  /* =======================================================
     CARGAR EXCEL
     ======================================================= */

  useEffect(() => {

    let cancelled =
      false;


    async function load() {

      try {

        setLoading(
          true
        );

        setError("");


        const data =
          await loadExcelData();


        if (
          cancelled
        ) {

          return;

        }


        setRows(
          data
        );

      }

      catch (err) {

        console.error(
          err
        );


        if (
          cancelled
        ) {

          return;

        }


        setError(
          err?.message ||
          "No fue posible cargar el Excel."
        );

      }

      finally {

        if (
          !cancelled
        ) {

          setLoading(
            false
          );

        }

      }

    }


    load();


    return () => {

      cancelled =
        true;

    };

  }, []);


  /* =======================================================
     CUANDO CAMBIA EL USUARIO
     ======================================================= */

  useEffect(() => {

    /*
     * Si el usuario tiene una Nacional
     * asignada, la seleccionamos automáticamente.
     */

    if (
      selectedUser?.filterTeam
    ) {

      setSelectedTeam(
        selectedUser.filterTeam
      );

    } else {

      setSelectedTeam(
        "Todos"
      );

    }


    /*
     * Al cambiar de usuario
     * reiniciamos Estado y Sector.
     */

    setSelectedStatus(
      "Todos"
    );

    setSelectedRubro(
      "Todos"
    );

    setSearchTerm("");
    setSelectedExecutive(null);

  }, [
    selectedUser,
  ]);

/* =======================================================
   AUTENTICACIÓN
   ======================================================= */

async function handleLogin() {
  if (!selectedUser) {
    return;
  }

  setLoginError("");
  setLoginLoading(true);

  try {
    const response = await fetch(
      "https://dashboard-comercial-q77m.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_id: selectedUser.dbId,
          password: loginPassword,
        }),
      }
    );

    const data = await response.json();

    if (!data.login) {
      setLoginError(
        data.mensaje || "Contraseña incorrecta"
      );
      return;
    }

    setAuthenticatedUser(data.usuario);

    setLoginPassword("");
    setLoginError("");
    setShowLogin(false);

    if (data.debe_cambiar_password) {
      setShowChangePassword(true);
    }

  } catch (error) {
    console.error(error);

    setLoginError(
      "No fue posible conectar con el servidor."
    );

  } finally {
    setLoginLoading(false);
  }
}

  /* =======================================================
     CAMBIO DE CONTRASEÑA
     ======================================================= */

  async function handleChangePassword() {
    setChangePasswordError("");

    if (!authenticatedUser) {
      setChangePasswordError("No hay un usuario autenticado.");
      return;
    }

    if (!/^\d{6}$/.test(newPassword)) {
      setChangePasswordError("La contraseña debe tener exactamente 6 dígitos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setChangePasswordError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const usuarioId =
        authenticatedUser.id ??
        authenticatedUser.usuario_id ??
        selectedUser?.dbId;

      const response = await fetch(
        "https://dashboard-comercial-q77m.onrender.com/cambiar-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario_id: usuarioId,
            nueva_password: newPassword,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.ok === false || data.login === false) {
        setChangePasswordError(
          data.mensaje ||
            data.detail ||
            "No fue posible actualizar la contraseña."
        );
        return;
      }

      setNewPassword("");
      setConfirmPassword("");
      setChangePasswordError("");
      setShowChangePassword(false);
    } catch (error) {
      console.error(error);
      setChangePasswordError(
        "No fue posible conectar con el servidor."
      );
    }
  }

  /* =======================================================
     FILAS BASE SEGÚN USUARIO
     ======================================================= */

  const permittedRows =
    useMemo(
      () =>
        applyUserPermissions(
          rows,
          selectedUser
        ),

      [
        rows,
        selectedUser,
      ]
    );


  /* =======================================================
     FILAS FILTRADAS
     ======================================================= */

  const filteredRows =
    useMemo(
      () =>
        filterRows({

          rows,

          user:
            selectedUser,

          selectedTeam,

          selectedStatus,

          selectedRubro,

          searchTerm,

        }),

      [
        rows,

        selectedUser,

        selectedTeam,

        selectedStatus,

        selectedRubro,

        searchTerm,
      ]
    );


  /* =======================================================
     CONTADORES DE SECTORES
     ======================================================= */

  /*
   * IMPORTANTE:
   *
   * Los números de cada sector representan
   * MARCAS ÚNICAS, no cantidad de propuestas.
   *
   * Además respetan el usuario y la Nacional
   * seleccionada.
   *
   * Si se selecciona un sector concreto,
   * los contadores siguen mostrando el
   * total por sector del contexto actual.
   */

  const sectorContextRows =
    useMemo(
      () => {

        let result =
          permittedRows;


        if (
          selectedTeam &&
          selectedTeam !==
            "Todos"
        ) {

          result =
            result.filter(
              (row) =>
                nacionalMatches(
                  row.nacional,
                  selectedTeam
                )
            );

        }


        if (
          selectedStatus &&
          selectedStatus !==
            "Todos"
        ) {

          result =
            result.filter(
              (row) =>
                row.estado ===
                normalizeEstado(
                  selectedStatus
                )
            );

        }


        return result;

      },

      [
        permittedRows,

        selectedTeam,

        selectedStatus,
      ]
    );


  const brandCountsByRubro =
    useMemo(
      () =>
        getBrandCountsByRubro(
          sectorContextRows
        ),

      [
        sectorContextRows,
      ]
    );


  /* =======================================================
     FILTROS ACTIVOS PARA LA VISTA
     ======================================================= */

  const currentRows =
    filteredRows;


  /* =======================================================
     NOMBRE DE VISTA
     ======================================================= */

  const pageTitle =
    selectedRubro !==
      "Todos"
      ? selectedRubro
      : "Dashboard Comercial";


  /* =======================================================
     LIMPIAR FILTROS
     ======================================================= */

  function clearFilters() {

    if (
      selectedUser?.filterTeam
    ) {

      setSelectedTeam(
        selectedUser.filterTeam
      );

    } else {

      setSelectedTeam(
        "Todos"
      );

    }


    setSelectedStatus(
      "Todos"
    );

    setSelectedRubro(
      "Todos"
    );

    setSearchTerm("");

  }


  /* =======================================================
     CAMBIAR USUARIO
     ======================================================= */

  function handleChangeUser(
    user
  ) {

    setSelectedUser(
      user
    );

    setMobileSidebarOpen(
      false
    );

  }


  /* =======================================================
     CAMBIAR NACIONAL
     ======================================================= */

  function handleTeamChange(
    team
  ) {

    /*
     * Si es líder nacional,
     * nunca permitimos cambiar
     * de su Nacional.
     */

    if (
      selectedUser?.filterTeam
    ) {

      setSelectedTeam(
        selectedUser.filterTeam
      );

      return;

    }


    setSelectedTeam(
      team
    );

    setSelectedExecutive(null);


    /*
     * Al cambiar Nacional,
     * el sector seleccionado
     * sigue funcionando como
     * filtro combinado.
     */

  }


  /* =======================================================
     CAMBIAR SECTOR
     ======================================================= */

  function handleRubroChange(
    rubro
  ) {

    setSelectedRubro(
      rubro
    );


    /*
     * Cuando seleccionamos un sector
     * pasamos a la vista del sector.
     */

    if (
      rubro &&
      rubro !==
        "Todos"
    ) {

      setActiveSection(
        "sector"
      );

    } else {

      setActiveSection(
        "resumen"
      );

    }

  }


  /* =======================================================
     CAMBIAR RESUMEN
     ======================================================= */

  function handleSectionChange(
    section
  ) {

    setActiveSection(
      section
    );


    if (
      section ===
      "resumen"
    ) {

      setSelectedRubro(
        "Todos"
      );

    }

  }

/* =======================================================
   SELECCIÓN INICIAL DE USUARIO
   ======================================================= */

  if (!selectedUser) {
    const normalizeName = (name = "") =>
      name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();

    const tatiana = USERS.find((user) =>
      normalizeName(user.name).includes("tatiana garcia calderon")
    );

    const innovationNames = [
      "glen orillo starke",
      "juan pablo godoy",
      "jonathan velasquez",
      "sthefanie botello",
    ];

    const nationalNames = [
      "diana milena contreras rodriguez",
      "juan sebastian abella quintero",
      "tatiana pelaez copete",
      "ivonne adriana moriones alvarez",
      "william ocampo arguello",
    ];

    const innovationUsers = USERS.filter((user) =>
      innovationNames.includes(normalizeName(user.name))
    );

    const nationalUsers = USERS.filter((user) =>
      nationalNames.includes(normalizeName(user.name))
    );

    const administrador = USERS.find(
      (user) => user.id === "administrador"
    );

    const openLogin = (user) => {
      if (!user) return;
      setSelectedUser(user);
      setLoginPassword("");
      setLoginError("");
      setShowLogin(true);
      setShowChangePassword(false);
      setNewPassword("");
      setConfirmPassword("");
      setChangePasswordError("");
    };

    return (
      <div className="user-selection-screen">
        <div className="user-selection-content">
          <h1>Dashboard comercial</h1>

          <p className="user-selection-subtitle">
            Selecciona tu usuario para acceder al dashboard
          </p>

          <div className="selection-section">
            <div className="selection-section-title">
              <span></span>
              <strong>DIRECCIÓN COMERCIAL</strong>
              <span></span>
            </div>

            {tatiana && (
              <button
                type="button"
                className="selection-director-card"
                onClick={() => openLogin(tatiana)}
              >
                <UserAvatar user={tatiana} size="large" />
                <strong>{tatiana.name}</strong>
                <span>{tatiana.role}</span>
              </button>
            )}
          </div>

          <div className="selection-section">
            <div className="selection-section-title">
              <span></span>
              <strong>ÁREA DE INNOVACIÓN DIGITAL</strong>
              <span></span>
            </div>

            <div className="selection-innovation-grid">
              {innovationUsers.map((user) => (
                <button
                  type="button"
                  key={user.id}
                  className="selection-innovation-card"
                  onClick={() => openLogin(user)}
                >
                  <UserAvatar user={user} size="large" />
                  <strong>{user.name}</strong>
                  <span>{user.role}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="selection-section">
            <div className="selection-section-title">
              <span></span>
              <strong>NACIONALES</strong>
              <span></span>
            </div>

            <div className="selection-national-grid">
              {nationalUsers.map((user) => (
                <button
                  type="button"
                  key={user.id}
                  className="selection-national-card"
                  onClick={() => openLogin(user)}
                >
                  <UserAvatar user={user} size="large" />
                  <strong>{user.name}</strong>
                  <span>{user.role}</span>
                </button>
              ))}
            </div>
          </div>

          {administrador && (
            <button
              type="button"
              className="selection-admin-card"
              onClick={() => openLogin(administrador)}
              aria-label="Ingresar como Administrador"
            >
              <UserAvatar user={administrador} size="small" />
              <div>
                <strong>Administrador</strong>
                <span>Acceso total</span>
              </div>
            </button>
          )}

          <div className="selection-footer">
            Prisa Media · Área de Innovación Digital
          </div>
        </div>
      </div>
    );
  }

/* =======================================================
   LOADING
   ======================================================= */

  if (
    loading
  ) {

    return (

      <div className="dashboard-loading">

        <div className="loading-spinner" />

        <strong>
          Cargando dashboard...
        </strong>

        <span>
          Leyendo información de BS_PRISA.xlsx
        </span>

      </div>

    );

  }


  /* =======================================================
     ERROR
     ======================================================= */

  if (
    error
  ) {

    return (

      <div className="dashboard-error">

        <div className="dashboard-error-card">

          <div className="dashboard-error-icon">

            <X
              size={22}
            />

          </div>


          <h2>
            No se pudo cargar el dashboard
          </h2>


          <p>
            {error}
          </p>


          <p>

            Verifica que
            <strong>
              {" "}
              BS_PRISA.xlsx
            </strong>
            {" "}
            esté dentro de la carpeta
            <strong>
              {" "}
              public
            </strong>
            {" "}
            del proyecto.

          </p>


          <button
            type="button"

            onClick={() =>
              window.location.reload()
            }
          >
            Volver a intentar
          </button>

        </div>

      </div>

    );

  }


  /* =======================================================
     RENDER
     ======================================================= */

  return (

    <div
      className={
        `dashboard-app ${
          mobileSidebarOpen
            ? "sidebar-open"
            : ""
        }`
      }
    >

      {/* ===================================================
         SIDEBAR
         =================================================== */}

      <DashboardSidebar

        activeSection={
          activeSection
        }

        onSectionChange={
          handleSectionChange
        }


        selectedUser={
          selectedUser
        }

        onChangeUser={
          handleChangeUser
        }


        selectedTeam={
          selectedTeam
        }

        onTeamChange={
          handleTeamChange
        }


        selectedStatus={
          selectedStatus
        }

        onStatusChange={
          setSelectedStatus
        }


        selectedRubro={
          selectedRubro
        }

        onRubroChange={
          handleRubroChange
        }


        brandCountsByRubro={
          brandCountsByRubro
        }

      />


      {/* ===================================================
         OVERLAY MOBILE
         =================================================== */}

      {mobileSidebarOpen && (

        <div
          className="sidebar-mobile-overlay"

          onClick={() =>
            setMobileSidebarOpen(
              false
            )
          }
        />

      )}


      {/* ===================================================
         MAIN
         =================================================== */}

      <main className="dashboard-main">

        {/* =================================================
           HEADER MOBILE
           ================================================= */}

        <div className="mobile-dashboard-header">

          <button
            type="button"
            className="mobile-menu-button"

            onClick={() =>
              setMobileSidebarOpen(
                true
              )
            }
          >

            <Menu
              size={17}
            />

          </button>


          <strong>
            Dashboard Comercial
          </strong>

        </div>


        {/* =================================================
           TOPBAR
           ================================================= */}

        <DashboardTopbar

          currentUser={
            selectedUser
          }

          searchTerm={
            searchTerm
          }

          onSearchChange={
            setSearchTerm
          }

        />


        {/* =================================================
           CONTENT
           ================================================= */}

        <div className="dashboard-content">

          {/* FILTROS ACTIVOS */}

          <ActiveFilters
            selectedTeam={
              selectedTeam
            }

            selectedStatus={
              selectedStatus
            }

            selectedRubro={
              selectedRubro
            }

            onClear={
              clearFilters
            }
          />


          {/* =================================================
             EQUIPO DE INNOVACIÓN
             ================================================= */}

          <InnovationTeamSection
            selectedTeam={
              selectedTeam
            }
          />


          {/* =================================================
             EQUIPOS NACIONALES
             ================================================= */}

          <NationalTeamSection

            rows={
              currentRows
            }

            selectedTeam={
              selectedTeam
            }

            onOpenExecutive={
              setSelectedExecutive
            }

          />


          {/* =================================================
             VISTA
             ================================================= */}

          {selectedExecutive ? (

            <ExecutiveDetail
              executiveName={
                selectedExecutive
              }

              rows={
                currentRows
              }

              onBack={() =>
                setSelectedExecutive(
                  null
                )
              }

              onOpenProposal={
                setSelectedProposal
              }
            />

          ) : selectedRubro !==
            "Todos" ? (

            <RubroView

              rubro={
                selectedRubro
              }

              rows={
                currentRows
              }

              selectedTeam={
                selectedTeam
              }

              selectedStatus={
                selectedStatus
              }

              onOpenProposal={
                setSelectedProposal
              }

            />

          ) : (

            <SummaryView

              rows={
                currentRows
              }

              selectedTeam={
                selectedTeam
              }

              selectedStatus={
                selectedStatus
              }

              selectedRubro={
                selectedRubro
              }

              onOpenProposal={
                setSelectedProposal
              }

            />

          )}

        </div>

      </main>


      {/* ===================================================
         AUTENTICACIÓN
         =================================================== */}

      {showLogin && selectedUser && (
        <div
          className="auth-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-title"
        >
          <div className="login-card">
            <UserAvatar user={selectedUser} size="medium" />

            <h2 id="login-title">Ingresar</h2>
            <p>{selectedUser.name}</p>

            <label htmlFor="login-password">
              Contraseña de 6 dígitos
            </label>

            <input
              id="login-password"
              type="password"
              inputMode="numeric"
              autoComplete="current-password"
              maxLength={6}
              value={loginPassword}
              onChange={(event) =>
                setLoginPassword(
                  event.target.value.replace(/\D/g, "").slice(0, 6)
                )
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleLogin();
                }
              }}
              placeholder="••••••"
              autoFocus
            />

            {loginError && (
              <div className="login-error">{loginError}</div>
            )}

            <button
              type="button"
              className="login-button"
              onClick={handleLogin}
              disabled={
                loginLoading || !/^\d{6}$/.test(loginPassword)
              }
            >
              {loginLoading ? "Ingresando..." : "Ingresar"}
            </button>

            <button
              type="button"
              className="login-back-button"
              onClick={() => {
                setShowLogin(false);
                setLoginPassword("");
                setLoginError("");
                setSelectedUser(null);
              }}
              disabled={loginLoading}
            >
              Volver
            </button>
          </div>
        </div>
      )}

      {showChangePassword && authenticatedUser && (
        <div
          className="auth-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="change-password-title"
        >
          <div className="change-password-card">
            <UserAvatar
              user={selectedUser}
              size="medium"
            />

            <h2 id="change-password-title">
              Actualizar contraseña
            </h2>

            <p>
              Por seguridad, crea una nueva contraseña de 6 dígitos.
            </p>

            <label htmlFor="new-password">
              Nueva contraseña
            </label>
            <input
              id="new-password"
              type="password"
              inputMode="numeric"
              autoComplete="new-password"
              maxLength={6}
              value={newPassword}
              onChange={(event) =>
                setNewPassword(
                  event.target.value.replace(/\D/g, "").slice(0, 6)
                )
              }
              placeholder="••••••"
              autoFocus
            />

            <label htmlFor="confirm-password">
              Confirmar contraseña
            </label>
            <input
              id="confirm-password"
              type="password"
              inputMode="numeric"
              autoComplete="new-password"
              maxLength={6}
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value.replace(/\D/g, "").slice(0, 6)
                )
              }
              placeholder="••••••"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleChangePassword();
                }
              }}
            />

            {changePasswordError && (
              <div className="login-error">
                {changePasswordError}
              </div>
            )}

            <button
              type="button"
              className="login-button"
              onClick={handleChangePassword}
              disabled={
                !/^\d{6}$/.test(newPassword) ||
                !/^\d{6}$/.test(confirmPassword) ||
                newPassword !== confirmPassword
              }
            >
              Guardar contraseña
            </button>
          </div>
        </div>
      )}

      {/* ===================================================
         MODAL
         =================================================== */}

      {selectedProposal && (

        <ProposalModal

          row={
            selectedProposal
          }

          onClose={() =>
            setSelectedProposal(
              null
            )
          }

        />

      )}

    </div>

  );

}


/* =========================================================
   FIN APP.JSX — PARTE 6/6
   ========================================================= */


