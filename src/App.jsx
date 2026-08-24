import { useMemo, useState } from "react";
import "./App.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

/* =========================================================
   USUARIOS Y RESTRICCIONES
   ========================================================= */

const usuarios = {
  direccion: [
    {
      id: "tg",
      iniciales: "TG",
      nombre: "Tatiana Garcia Calderon",
      cargo: "Gerente comercial nacional",
      tag: "Todas las nacionales",
      acceso: "todo",
    },
  ],

  innovacion: [
    {
      id: "go",
      iniciales: "GO",
      nombre: "Glen Orillo Starke",
      cargo: "Director Innovación Digital",
      tag: "Todas las nacionales",
      acceso: "todo",
      foto: "/images/GlenHD.png",
    },
    {
      id: "jp",
      iniciales: "JP",
      nombre: "Juan Pablo Godoy",
      cargo: "Encargado de N1 y N3",
      tag: "Todas las nacionales",
      acceso: "todo",
      foto: "/images/JuanPabloHD.png",
    },
    {
      id: "jv",
      iniciales: "JV",
      nombre: "Jonathan Velásquez",
      cargo: "Encargado de N2 y N4",
      tag: "Todas las nacionales",
      acceso: "todo",
      foto: "/images/JonathanHD.png",
    },
    {
      id: "sb",
      iniciales: "SB",
      nombre: "Sthefanie Botello",
      cargo: "Encargada de N5",
      tag: "Todas las nacionales",
      acceso: "todo",
      foto: "/images/SthefHD.png",
    },
  ],

  nacionales: [
    {
      id: "dm",
      iniciales: "DM",
      nombre: "Diana Milena Contreras Rodriguez",
      cargo: "Lider Nacional 1",
      tag: "Nacional 1",
      acceso: "N1",
    },
    {
      id: "js",
      iniciales: "JS",
      nombre: "Juan Sebastian Abella Quintero",
      cargo: "Lider Nacional 2",
      tag: "Nacional 2",
      acceso: "N2",
    },
    {
      id: "tp",
      iniciales: "TP",
      nombre: "Tatiana Pelaez Copete",
      cargo: "Lider Nacional 3",
      tag: "Nacional 3",
      acceso: "N3",
    },
    {
      id: "ia",
      iniciales: "IA",
      nombre: "Ivonne Adriana Moriones Alvarez",
      cargo: "Lider Nacional 4",
      tag: "Nacional 4",
      acceso: "N4",
    },
    {
      id: "wo",
      iniciales: "WO",
      nombre: "William Ocampo Arguello",
      cargo: "Lider Nacional 5",
      tag: "Nacional 5",
      acceso: "N5",
    },
  ],
};

const todosLosUsuarios = [
  ...usuarios.direccion,
  ...usuarios.innovacion,
  ...usuarios.nacionales,
];

/* =========================================================
   DATOS DEL EXCEL
   ========================================================= */

const datosComerciales = [
  {
    EQUIPO: "ALIANZAS",
    "NOMBRE EJECUTIVO": "ALIANZAS",
    CUENTA: "DISQUERAS - TIQUETERAS",
    "VENTA ESTIMADA": 10000000,
    "NECESIDAD 1":
      "PROPUESTA DIGITAL PARA DISQUERAS, EVENTOS Y TIQUETERAS - FRANQUICIAS",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "ENTREGAR PROPUESTA",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "ALIANZAS|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "ALIANZAS",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-03",
    "FECHA DE ENTREGA": "2026-06-03",
    "LINK DE PRESENTACION":
      "PRODUCTO DIGITAL-FRANQUICIAS-MÚSICA EN MOVIMIENTO.pptx",
    "VALOR DE LA PROPUESTA": 10000000,
    "ASESOR INNOVACION DIGITAL": "Equipo Innovación Digital",
    id: 1,
  },

  {
    EQUIPO: "ALIANZAS",
    "NOMBRE EJECUTIVO": "ALIANZAS",
    CUENTA: "FRANQUICIAS",
    "VENTA ESTIMADA": 10000000,
    "NECESIDAD 1": "PROPUESTA DE FRANQUICIAS PARA EVENTOS",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "ENTREGAR PROPUESTA",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "ALIANZAS|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "ALIANZAS",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-03",
    "FECHA DE ENTREGA": "2026-06-03",
    "LINK DE PRESENTACION": "PRODUCTO DIGITAL-DEL PLAY AL SHOW.pptx",
    "VALOR DE LA PROPUESTA": 10000000,
    "ASESOR INNOVACION DIGITAL": "Equipo Innovación Digital",
    id: 2,
  },

  {
    EQUIPO: "PRODUCTOS GENERALES",
    "NOMBRE EJECUTIVO": "PRODUCTOS GENERALES",
    CUENTA: "FRANQUICIAS",
    "VENTA ESTIMADA": 20000000,
    "NECESIDAD 1": "PROPUESTA DE FRANQUICIAS POR RUBROS",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "ENTREGAR PROPUESTA",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "PRODUCTOS GENERALES|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "PRODUCTOS GENERALES",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-01",
    "FECHA DE ENTREGA": "2026-06-01",
    "LINK DE PRESENTACION": "FRANQUICIAS PRISA.pptx",
    "VALOR DE LA PROPUESTA": 20000000,
    "ASESOR INNOVACION DIGITAL": "Equipo Innovación Digital",
    id: 3,
  },

  {
    EQUIPO: "PRODUCTOS GENERALES",
    "NOMBRE EJECUTIVO": "PRODUCTOS GENERALES",
    CUENTA: "FRANQUICIAS",
    "VENTA ESTIMADA": 20000000,
    "NECESIDAD 1": "PROPUESTA DE FRANQUICIAS POR PAQUETES",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "ENTREGAR PROPUESTA",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "PRODUCTOS GENERALES|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "PRODUCTOS GENERALES",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-01",
    "FECHA DE ENTREGA": "2026-06-01",
    "LINK DE PRESENTACION": "Producto_Digital_FRANQUICIAS PRISA 2026.pptx",
    "VALOR DE LA PROPUESTA": 20000000,
    "ASESOR INNOVACION DIGITAL": "Equipo Innovación Digital",
    id: 4,
  },

  {
    EQUIPO: "PRODUCTOS GENERALES",
    "NOMBRE EJECUTIVO": "PRODUCTOS GENERALES",
    CUENTA: "ELECCIONES 2026",
    "VENTA ESTIMADA": 20000000,
    "NECESIDAD 1": "PROPUESTA ELECCIONES 2026",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "ENTREGAR PROPUESTA",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "PRODUCTOS GENERALES|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "PRODUCTOS GENERALES",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-01",
    "FECHA DE ENTREGA": "2026-06-01",
    "LINK DE PRESENTACION": "PRODUCTO DIGITAL-ELECCIONES 2026.pptx",
    "VALOR DE LA PROPUESTA": 20000000,
    "ASESOR INNOVACION DIGITAL": "Equipo Innovación Digital",
    id: 5,
  },

  {
    EQUIPO: "PRODUCTOS GENERALES",
    "NOMBRE EJECUTIVO": "PRODUCTOS GENERALES",
    CUENTA: "PRODUCTOS GENERALES",
    "VENTA ESTIMADA": 20000000,
    "NECESIDAD 1": "PROPUESTA DIGITAL LA RUTA DEL GOL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "ENTREGAR PROPUESTA",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "PRODUCTOS GENERALES|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "PRODUCTOS GENERALES",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-01",
    "FECHA DE ENTREGA": "2026-06-01",
    "LINK DE PRESENTACION": "PRODUCTO DIGITAL-LA RUTA DEL GOL.pptx",
    "VALOR DE LA PROPUESTA": 20000000,
    "ASESOR INNOVACION DIGITAL": "Equipo Innovación Digital",
    id: 6,
  },

  {
    EQUIPO: "PRODUCTOS GENERALES",
    "NOMBRE EJECUTIVO": "PRODUCTOS GENERALES",
    CUENTA: "PRODUCTOS GENERALES",
    "VENTA ESTIMADA": 20000000,
    "NECESIDAD 1": "PROPUESTA DE FRANQUICIAS MUNDIAL 2026",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "ENTREGAR PROPUESTA",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "PRODUCTOS GENERALES|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "PRODUCTOS GENERALES",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-01",
    "FECHA DE ENTREGA": "2026-06-01",
    "LINK DE PRESENTACION":
      "Producto_Digital_FRANQUICIA MUNDIALISTA.pptx",
    "VALOR DE LA PROPUESTA": 20000000,
    "ASESOR INNOVACION DIGITAL": "Equipo Innovación Digital",
    id: 7,
  },

  {
    EQUIPO: "PRODUCTOS GENERALES",
    "NOMBRE EJECUTIVO": "PRODUCTOS GENERALES",
    CUENTA: "PRODUCTOS GENERALES",
    "VENTA ESTIMADA": 20000000,
    "NECESIDAD 1": "PROPUESTA DIGITAL BEAUTY",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "ENTREGAR PROPUESTA",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "PRODUCTOS GENERALES|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "PRODUCTOS GENERALES",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-01",
    "FECHA DE ENTREGA": "2026-06-01",
    "LINK DE PRESENTACION": "Producto_Digital_Universo Beauty.pptx",
    "VALOR DE LA PROPUESTA": 20000000,
    "ASESOR INNOVACION DIGITAL": "Equipo Innovación Digital",
    id: 8,
  },

  {
    EQUIPO: "PRODUCTOS GENERALES",
    "NOMBRE EJECUTIVO": "PRODUCTOS GENERALES",
    CUENTA: "PRODUCTOS GENERALES",
    "VENTA ESTIMADA": 20000000,
    "NECESIDAD 1": "PROPUESTA DIGITAL CONSTRUCTORAS",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "ENTREGAR PROPUESTA",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "PRODUCTOS GENERALES|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "PRODUCTOS GENERALES",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-01",
    "FECHA DE ENTREGA": "2026-06-01",
    "LINK DE PRESENTACION": "Producto_Digital_LIVING EXPERIENCE.pptx",
    "VALOR DE LA PROPUESTA": 20000000,
    "ASESOR INNOVACION DIGITAL": "Equipo Innovación Digital",
    id: 9,
  },

  {
    EQUIPO: "PRODUCTOS GENERALES",
    "NOMBRE EJECUTIVO": "PRODUCTOS GENERALES",
    CUENTA: "PRODUCTOS GENERALES",
    "VENTA ESTIMADA": 20000000,
    "NECESIDAD 1": "PROPUESTA DIGITAL SHOPPABLE",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "ENTREGAR PROPUESTA",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "PRODUCTOS GENERALES|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "PRODUCTOS GENERALES",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-01",
    "FECHA DE ENTREGA": "2026-06-01",
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 20000000,
    "ASESOR INNOVACION DIGITAL": "Equipo Innovación Digital",
    id: 10,
  },

  {
    EQUIPO: "PRODUCTOS GENERALES",
    "NOMBRE EJECUTIVO": "PRODUCTOS GENERALES",
    CUENTA: "PRODUCTOS GENERALES",
    "VENTA ESTIMADA": 20000000,
    "NECESIDAD 1": "PROPUESTA DIGITAL TECNOLOGIA DNS",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "ENTREGAR PROPUESTA",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "PRODUCTOS GENERALES|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "PRODUCTOS GENERALES",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-01",
    "FECHA DE ENTREGA": "2026-06-01",
    "LINK DE PRESENTACION":
      "Producto_Digital_RADIO INTERACTIVO.pptx",
    "VALOR DE LA PROPUESTA": 20000000,
    "ASESOR INNOVACION DIGITAL": "Equipo Innovación Digital",
    id: 11,
  },

  {
    EQUIPO: "PRODUCTOS GENERALES",
    "NOMBRE EJECUTIVO": "PRODUCTOS GENERALES",
    CUENTA: "PRODUCTOS GENERALES",
    "VENTA ESTIMADA": 20000000,
    "NECESIDAD 1": "DESARROLO DE AGENTE DE IA",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "ENTREGAR PROPUESTA",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "PRODUCTOS GENERALES|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "PRODUCTOS GENERALES",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-01",
    "FECHA DE ENTREGA": "2026-06-01",
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 20000000,
    "ASESOR INNOVACION DIGITAL": "Equipo Innovación Digital",
    id: 12,
  },

  {
    EQUIPO: "PRODUCTOS GENERALES",
    "NOMBRE EJECUTIVO": "PRODUCTOS GENERALES",
    CUENTA: "CONEXIÓN PRISA",
    "VENTA ESTIMADA": 20000000,
    "NECESIDAD 1":
      "CONEXIÓN PRISA. UNA DINÁMICA COMERCIAL QUE PRESENTA PRODUCTOS DIGITALES EXCLUSIVOS PARA CADA RUBRO, IMPULSANDO OPORTUNIDADES DE NEGOCIO EN TIEMPO REAL.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital al area comercial",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "Seguimiento – Evento 22 de julio",
    "AVANCE PLAN 2": 50,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "PRODUCTOS GENERALES|En seguimiento",
    PRIORIDAD: "Alta",
    RESPONSABLE: "PRODUCTOS GENERALES",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-06",
    "FECHA DE ENTREGA": "2026-07-06",
    "LINK DE PRESENTACION":
      "Producto_Digital-CONEXIÓN PRISA.pptx",
    "VALOR DE LA PROPUESTA": 20000000,
    "ASESOR INNOVACION DIGITAL": "Equipo Innovación Digital",
    id: 13,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Andrea Morales",
    CUENTA: "MANTEQUILLA LA BUENA",
    "VENTA ESTIMADA": 40000000,
    "NECESIDAD 1":
      "PROPUESTA CAPSULAS FRANQUICIAS - PROBANDO PROBANDO Y CHICAS EN SU SALSA",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "ENTREGAR PROPUESTA",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N1|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Andrea Morales",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-22",
    "FECHA DE ENTREGA": "2026-07-22",
    "LINK DE PRESENTACION": "PRODUCTO DIGITAL - LA BUENA.pptx",
    "VALOR DE LA PROPUESTA": 42014863,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 14,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Diana Contreras Rodriguez",
    CUENTA: "YALE",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N1|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Diana Contreras Rodriguez",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 15,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Rosa Diaz",
    CUENTA: "CAFAM",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N1|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Rosa Diaz",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 16,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Rosa Diaz",
    CUENTA: "KOALA",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N1|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Rosa Diaz",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 17,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Rosa Diaz",
    CUENTA: "NISSAN",
    "VENTA ESTIMADA": 50000000,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "ENTREGAR PROPUESTA",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N1|En seguimiento",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Rosa Diaz",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-21",
    "FECHA DE ENTREGA": "2026-07-30",
    "LINK DE PRESENTACION":
      "https://grupoprisa-my.sharepoint.com/:p:/g/personal/juangodoy_est_caracol_com_co/IQCYkmJrdbInS4u8M93JA0qcAZGDL-39y8dP9-zxG8YRQ3k",
    "VALOR DE LA PROPUESTA": 58000000,
    "ASESOR INNOVACION DIGITAL": "Juan Pablo Godoy",
    id: 18,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Rosa Diaz",
    CUENTA: "CHANGAN",
    "VENTA ESTIMADA": 50000000,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "ENTREGAR PROPUESTA",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N1|En seguimiento",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Rosa Diaz",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-21",
    "FECHA DE ENTREGA": "2026-07-30",
    "LINK DE PRESENTACION":
      "https://grupoprisa-my.sharepoint.com/:p:/g/personal/juangodoy_est_caracol_com_co/IQCHxe3NSSkMSpsZDwFQ5LU5Ac7jtZiYMDl8eyyLQMcBTDw",
    "VALOR DE LA PROPUESTA": 58000000,
    "ASESOR INNOVACION DIGITAL": "Juan Pablo Godoy",
    id: 19,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Rosa Diaz",
    CUENTA: "PORCHE",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N1|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Rosa Diaz",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 20,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Felipe Guillen",
    CUENTA: "SAMSUNG",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N1|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Felipe Guillen",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 21,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Diana Contreras Rodriguez",
    CUENTA: "PLEXI",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N1|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Diana Contreras Rodriguez",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 22,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Felipe Guillen",
    CUENTA: "PRIMAX",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N1|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Felipe Guillen",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 23,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Carolina Diaz",
    CUENTA: "COLSANITAS",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2":
      "SE DESARROLLO UNA PROPUESTA PARA MUNDO COLSANITAS (PODCAST, CHAT IA)",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3":
      "REALIZAR SEGUIMIENTO A LA PROPUESTA PARA CONOCER SU ESTADO, CONFIRMAR SI SE CONCRETÓ EL CIERRE E IDENTIFICAR OPORTUNIDADES DE MEJORA.",
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N1|En seguimiento",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Carolina Diaz",
    MES: "AGOSTO",
    "FECHA SOLICITUD": "2026-08-13",
    "FECHA DE ENTREGA": "2026-08-20",
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 24,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Carolina Diaz",
    CUENTA: "PROSEGURO",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N1|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Carolina Diaz",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 25,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Carolina Diaz",
    CUENTA: "KELLOGS",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N1|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Carolina Diaz",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 26,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Carolina Diaz",
    CUENTA: "AJINOMOTO",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N1|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Carolina Diaz",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 27,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Diana Contreras Rodriguez",
    CUENTA: "KNORR",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N1|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Diana Contreras Rodriguez",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 28,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Carolina Diaz",
    CUENTA: "SUPERMERCADO MAKRO",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N1|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Carolina Diaz",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 29,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Andrea Morales",
    CUENTA: "CASA LUKER",
    "VENTA ESTIMADA": 28500000,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 50,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N1|En seguimiento",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Andrea Morales",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-08",
    "FECHA DE ENTREGA": "2026-07-08",
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 28500000,
    "ASESOR INNOVACION DIGITAL": "Jonathan Velasquez",
    id: 30,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Andrea Morales",
    CUENTA: "ALQUERIA",
    "VENTA ESTIMADA": 34000000,
    "NECESIDAD 1":
      "FRANQUICIA - LA MIL OFICIOS Y SE LO EXPLICO CON EXPERTOS",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 50,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N1|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Andrea Morales",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-08-04",
    "FECHA DE ENTREGA": "2026-08-05",
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 34000000,
    "ASESOR INNOVACION DIGITAL": "Jonathan Velasquez",
    id: 31,
  },
    {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Andrea Morales",
    CUENTA: "VOLVO",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N1|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Andrea Morales",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 32,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Andrea Morales",
    CUENTA: "CAJA SOCIAL",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N1|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Andrea Morales",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 33,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Natalia Zambrano",
    CUENTA: "RAMO",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N1|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Natalia Zambrano",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 34,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Natalia Zambrano",
    CUENTA: "SPOTIFY",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N1|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Natalia Zambrano",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 35,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Felipe Guillen",
    CUENTA: "DON JULIO",
    "VENTA ESTIMADA": 15000000,
    "NECESIDAD 1": "Ruta del gol",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "se paso la propuesta ruta del gol",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "acaptaron la propuesta",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3":
      "La propuesta fue aprobada por el cliente. Actualmente nos encontramos a la espera de su ejecución.",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "Cerrada",
    CLAVE: "N1|Cerrada",
    PRIORIDAD: null,
    RESPONSABLE: "Felipe Guillen",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-25",
    "FECHA DE ENTREGA": "2026-06-25",
    "LINK DE PRESENTACION": "PRODUCTO DIGITAL-LA RUTA DEL GOL.pptx",
    "VALOR DE LA PROPUESTA": 32000000,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 36,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Andrea Morales",
    CUENTA: "ARTURO CALLE",
    "VENTA ESTIMADA": 50000000,
    "NECESIDAD 1":
      "DESARROLO DE PROPUESTA DIGITAL - FRANQUICIA PLAZA ALVIRA",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "no aprobado por el cliente",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "en seguimiento",
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N1|En seguimiento",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Andrea Morales",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-02",
    "FECHA DE ENTREGA": "2026-07-02",
    "LINK DE PRESENTACION": "EL TOUR DEL ESTILO.pptx",
    "VALOR DE LA PROPUESTA": 76000000,
    "ASESOR INNOVACION DIGITAL": "Juan Pablo Godoy",
    id: 37,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Carolina Diaz",
    CUENTA: "ADIDAS",
    "VENTA ESTIMADA": 35000000,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N1|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Carolina Diaz",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-09",
    "FECHA DE ENTREGA": "2026-07-09",
    "LINK DE PRESENTACION": "PROPUESTA ADIDAS.pptx",
    "VALOR DE LA PROPUESTA": 39000000,
    "ASESOR INNOVACION DIGITAL": "Juan Pablo Godoy",
    id: 38,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Carolina Diaz",
    CUENTA: "HONOR",
    "VENTA ESTIMADA": 40000000,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "no aprobada por el cliente",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "no aprobada",
    CLAVE: "N1|no aprobada",
    PRIORIDAD: "Media",
    RESPONSABLE: "Carolina Diaz",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-09",
    "FECHA DE ENTREGA": "2026-07-09",
    "LINK DE PRESENTACION": "PROPUESTA COMERCIAL HONOR.pptx",
    "VALOR DE LA PROPUESTA": 39420000,
    "ASESOR INNOVACION DIGITAL": "Juan Pablo Godoy",
    id: 39,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Carolina Diaz",
    CUENTA: "NIKE",
    "VENTA ESTIMADA": 35000000,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N1|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Carolina Diaz",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-10",
    "FECHA DE ENTREGA": "2026-07-10",
    "LINK DE PRESENTACION": "PROPUESTA NIKE.pptx",
    "VALOR DE LA PROPUESTA": 39000000,
    "ASESOR INNOVACION DIGITAL": "Juan Pablo Godoy",
    id: 40,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Natalia Zambrano",
    CUENTA: "AMAZON",
    "VENTA ESTIMADA": 30000000,
    "NECESIDAD 1":
      "DESARROLO DE PROPUESTA DIGITAL - FRANQUICIA TECNOLOGIA",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N1|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Natalia Zambrano",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-10",
    "FECHA DE ENTREGA": "2026-07-10",
    "LINK DE PRESENTACION": "PROPUESTA AMAZON ECOMMERCE.pptx",
    "VALOR DE LA PROPUESTA": 32600000,
    "ASESOR INNOVACION DIGITAL": "Juan Pablo Godoy",
    id: 41,
  },

  {
    EQUIPO: "N2",
    "NOMBRE EJECUTIVO": "Camilo Prada",
    CUENTA: "COLFONDOS S.A. PENSIONES Y CESANTIAS",
    "VENTA ESTIMADA": 92198334,
    "NECESIDAD 1":
      "Tiene un decrecimiento en su participación del mercado de 91%. Y dejaron de invertir en la radio. FRANQUICIA EN SE LO EXPLICO CON EXPERTOS",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "GENERAR PROPUESTA COMERCIAL - FRANQUICIA SE LO EXPLICO CON EXPERTOS",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: "En seguimiento",
    ESTADO: "En seguimiento",
    CLAVE: "N2|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Camilo Prada",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-04",
    "FECHA DE ENTREGA": "2026-06-23",
    "LINK DE PRESENTACION": "PRODUCTO DIGITAL - COLFONDOS.pptx",
    "VALOR DE LA PROPUESTA": 30000000,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 42,
  },

  {
    EQUIPO: "N2",
    "NOMBRE EJECUTIVO": "Camilo Prada",
    CUENTA: "BIOCOMBUSTIBLES S.A.",
    "VENTA ESTIMADA": 42050587,
    "NECESIDAD 1":
      "Tiene un crecimiento en su participación del mercado de 77%. Radio tiene un crecimiento del 25%. Pero Prisa Media pierde la participación frente a RCN y Radio Polis.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3":
      "Con base en la retroalimentación del cliente, se ajusta la propuesta para la campaña específica y se entrega la versión final para su validación.",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N2|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Camilo Prada",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-23",
    "FECHA DE ENTREGA": "2026-07-03",
    "LINK DE PRESENTACION":
      "Producto_Digital-EL MUNDIAL SE JUEGA CON BIOMAX.pptx",
    "VALOR DE LA PROPUESTA": 30000000,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 43,
  },

  {
    EQUIPO: "N2",
    "NOMBRE EJECUTIVO": "Camilo Prada",
    CUENTA: "BEIJING XIAOMI MOBILE SOFTWARE CO LTD",
    "VENTA ESTIMADA": 24015738,
    "NECESIDAD 1":
      "Tiene un decrecimiento en su participación del mercado de 82%. Y dejaron de invertir en la radio.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": 0,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 0,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N2|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Camilo Prada",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 44,
  },

  {
    EQUIPO: "N2",
    "NOMBRE EJECUTIVO": "Camilo Prada",
    CUENTA: "FEDERACION NACIONAL DE CULTIVADORES DE PALMA DE ACEITE",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Tiene un crecimiento en su participación del mercado de 132%. Pero no tiene participación en la Radio.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": 0,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 0,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N2|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Camilo Prada",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 45,
  },

  {
    EQUIPO: "N2",
    "NOMBRE EJECUTIVO": "Camilo Prada",
    CUENTA: "LABORATORIOS BUSSIE SA",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Tienen un decrecimiento en su participación del mercado de 69%. Y tienen toda su participación en Diarios.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": 0,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 0,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N2|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Camilo Prada",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 46,
  },

  {
    EQUIPO: "N2",
    "NOMBRE EJECUTIVO": "Luisa Escobar",
    CUENTA: "DISTRIBUIDORA TOYOTA S.A.S.",
    "VENTA ESTIMADA": 28067985,
    "NECESIDAD 1":
      "Tiene un decrecimiento en su participación del mercado de 32%. Tienen el 61% de participación en la Radio, y Prisa Media perdió participación en el medio radial.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N2|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Luisa Escobar",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-04",
    "FECHA DE ENTREGA": "2026-06-24",
    "LINK DE PRESENTACION": "PRODUCTO DIGITAL DISTOYOTA.pptx",
    "VALOR DE LA PROPUESTA": 54244200,
    "ASESOR INNOVACION DIGITAL": "Juan Pablo Godoy",
    id: 47,
  },

  {
    EQUIPO: "N2",
    "NOMBRE EJECUTIVO": "Luisa Escobar",
    CUENTA: "BRECCIA SALUD S A S",
    "VENTA ESTIMADA": 13706000,
    "NECESIDAD 1":
      "Tiene un decrecimiento en la participación del mercado de 25%. Tiene el 37% de participación en la Radio, Prisa Media tiene el 6% perdiendo participación con RCN. FRANQUICIA EN ARMONIA",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "GENERAR PROPUESTA COMERCIAL - FRANQUICIA EN ARMONIA",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N2|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Luisa Escobar",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-04",
    "FECHA DE ENTREGA": "2026-06-25",
    "LINK DE PRESENTACION": "Producto_Digital_EN EQUILIBRIO.pptx",
    "VALOR DE LA PROPUESTA": 30200000,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 48,
  },

  {
    EQUIPO: "N2",
    "NOMBRE EJECUTIVO": "Luisa Escobar",
    CUENTA: "GRUPO EMPRESARIAL OIKOS S.A.S.",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Tiene un crecimiento en la participación del mercado de 300%. Y tiene su participación en los medios Digital y Vias Publicas.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": 0,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 0,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N2|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Luisa Escobar",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 49,
  },

  {
    EQUIPO: "N2",
    "NOMBRE EJECUTIVO": "Lina Lemus",
    CUENTA: "GRUPO EMPRESARIAL EN LINEA S.A.",
    "VENTA ESTIMADA": 17507282,
    "NECESIDAD 1":
      "Tiene un decrecimiento en su participación del mercado de 59%. Y la Radio tiene una participación del 10%, Prisa Media tiene el 30% de la participación en la radio. Perdiendo participación frente a Oro.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": 0,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 0,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N2|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Lina Lemus",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 50,
  },

  {
    EQUIPO: "N2",
    "NOMBRE EJECUTIVO": "Lina Lemus",
    CUENTA: "OPELLA HEALTHCARE COLOMBIA S.A.S.",
    "VENTA ESTIMADA": 86896644,
    "NECESIDAD 1":
      "Tiene un decrecimiento en la participación del mercado de 75%, la radio tiene una participación del 2%, y Prisa Media tiene el 88% de la participación en la Radio.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": 0,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 0,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N2|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Lina Lemus",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 51,
  },

  {
    EQUIPO: "N2",
    "NOMBRE EJECUTIVO": "Lina Lemus",
    CUENTA: "MERCADO LIBRE",
    "VENTA ESTIMADA": 30000000,
    "NECESIDAD 1": "PROPUESTA DIGITAL DINAMICA CAJA SORPRESA + PUNTOS",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "Por cerrar",
    CLAVE: "N2|Por cerrar",
    PRIORIDAD: "Media",
    RESPONSABLE: "Lina Lemus",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-04",
    "FECHA DE ENTREGA": "2026-06-08",
    "LINK DE PRESENTACION":
      "Producto_Digital_MERCADO LIBRE LIVE COMMERCE.pptx",
    "VALOR DE LA PROPUESTA": 30000000,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 52,
  },

  {
    EQUIPO: "N2",
    "NOMBRE EJECUTIVO": "Luisa Escobar",
    CUENTA: "CENCSUD",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N2|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Luisa Escobar",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 53,
  },

  {
    EQUIPO: "N2",
    "NOMBRE EJECUTIVO": "Luisa Escobar",
    CUENTA: "JUMBO",
    "VENTA ESTIMADA": 50000000,
    "NECESIDAD 1": "PROPUESTA DIGITAL DINAMICA CON NFC Y CHAT IA",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 2": 50,
    "PLAN DE ACCIÓN 3":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N2|En seguimiento",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Luisa Escobar",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-23",
    "FECHA DE ENTREGA": "2026-07-24",
    "LINK DE PRESENTACION":
      "Producto_Digital-LA GRAN FIESTA DEL FESTIVERSARIO.pptx",
    "VALOR DE LA PROPUESTA": 50000000,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 54,
  },

  {
    EQUIPO: "N2",
    "NOMBRE EJECUTIVO": "Lina Lemus",
    CUENTA: "VANTI",
    "VENTA ESTIMADA": 75000000,
    "NECESIDAD 1":
      "PROPUESTA DIGITAL DINAMICA PAUTA INVESTIGATIVA, CAMION TROPICANA Y NFC",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 2": 50,
    "PLAN DE ACCIÓN 3":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N2|En seguimiento",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Lina Lemus",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-22",
    "FECHA DE ENTREGA": "2026-07-27",
    "LINK DE PRESENTACION":
      "MAPA DEL ULTIMO 1_ - VANTI - TROPICANA (1).pptx",
    "VALOR DE LA PROPUESTA": 75000000,
    "ASESOR INNOVACION DIGITAL": "Jonathan Velasquez",
    id: 55,
  },

  {
    EQUIPO: "N2",
    "NOMBRE EJECUTIVO": "Luisa Escobar",
    CUENTA: "DAVIVIENDA",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N2|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Luisa Escobar",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 56,
  },

  {
    EQUIPO: "N2",
    "NOMBRE EJECUTIVO": "Lina Lemus",
    CUENTA: "NU BANK",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N2|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Lina Lemus",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 57,
  },

  {
    EQUIPO: "N2",
    "NOMBRE EJECUTIVO": "Lina Lemus",
    CUENTA: "FENAVI",
    "VENTA ESTIMADA": 40000000,
    "NECESIDAD 1":
      "DESARROLO DE PROPUESTA DIGITAL - FRANQUICIA PROBANDO PROBANDO",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "La propuesta fue presentada al cliente",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3":
      "El cliente acepta la propuesta y esta queda pendiente de ejecución.",
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "Por cerrar",
    CLAVE: "N2|Por cerrar",
    PRIORIDAD: "Media",
    RESPONSABLE: "Lina Lemus",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-01",
    "FECHA DE ENTREGA": "2026-07-01",
    "LINK DE PRESENTACION":
      "Producto_Digital-La proteína que une a Colombia- FENAVI.pptx",
    "VALOR DE LA PROPUESTA": 40000000,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 58,
  },

  {
    EQUIPO: "N3",
    "NOMBRE EJECUTIVO": "Helen Fajardo",
    CUENTA: "INVERSIONES GLP S.A.S. E.S.P.",
    "VENTA ESTIMADA": 38566800,
    "NECESIDAD 1":
      "Tiene un decrecimiento en su participación del mercado de 99%. Tiene toda su participación en Diarios.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": 0,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 0,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N3|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Helen Fajardo",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 59,
  },

  {
    EQUIPO: "N3",
    "NOMBRE EJECUTIVO": "Helen Fajardo",
    CUENTA: "UNIVERSIDAD EUROPEA",
    "VENTA ESTIMADA": 40000000,
    "NECESIDAD 1":
      "PROPUESTA DIGITAL TODO Y MAS + FRANQUICIAS TECNOLOGIA Y LA OTRA ENTREVISTA",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "ENTREGAR PROPUESTA",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N3|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Helen Fajardo",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-12",
    "FECHA DE ENTREGA": "2026-06-12",
    "LINK DE PRESENTACION": "PRODUCTO DIGITAL - FUTURO GLOBAL 1.pptx",
    "VALOR DE LA PROPUESTA": 46437280,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 60,
  },
    {
    EQUIPO: "N3",
    "NOMBRE EJECUTIVO": "Hugo Urrea",
    CUENTA: "CLARO",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "e-commerce / venta digital, tecnología, ciberseguridad, servicios de fibra, facturación electrónica",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N3|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Hugo Urrea",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 61,
  },

  {
    EQUIPO: "N3",
    "NOMBRE EJECUTIVO": "Hugo Urrea",
    CUENTA: "POLITECNICO",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Leads - calidad - no registro - matricula",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N3|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Hugo Urrea",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 62,
  },

  {
    EQUIPO: "N3",
    "NOMBRE EJECUTIVO": "Sofia Calvera",
    CUENTA: "CORONA",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Este año su campaña es muy visual NSE alto / se le ha ofrecido figital pero no les gusta",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N3|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Sofia Calvera",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 63,
  },

  {
    EQUIPO: "N3",
    "NOMBRE EJECUTIVO": "Elsa Cortez",
    CUENTA: "U AREA ANDINA",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "Leads - calidad x inscripciones",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N3|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Elsa Cortez",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 64,
  },

  {
    EQUIPO: "N3",
    "NOMBRE EJECUTIVO": "Helen Fajardo",
    CUENTA: "MOTAI",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Es una app para comprar moto fácil, la idea es mostrar cómo es de fácil adquirir su moto. Presupuesto bajo",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N3|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Helen Fajardo",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 65,
  },

  {
    EQUIPO: "N3",
    "NOMBRE EJECUTIVO": "Laura Melo",
    CUENTA: "PARAMO",
    "VENTA ESTIMADA": 15000000,
    "NECESIDAD 1":
      "Solo nos ven como radio pero hacen pauta en otro lado, necesitamos vendernos como plataforma digital",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "Propuesta entregada",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N3|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Laura Melo",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-05-26",
    "FECHA DE ENTREGA": "2026-07-21",
    "LINK DE PRESENTACION": "PROPUESTA PARAMO PRESENTA.pptx",
    "VALOR DE LA PROPUESTA": 15000000,
    "ASESOR INNOVACION DIGITAL": "Juan Pablo Godoy",
    id: 66,
  },

  {
    EQUIPO: "N3",
    "NOMBRE EJECUTIVO": "Diana Andrea Rodiguez",
    CUENTA: "NESTOGENO",
    "VENTA ESTIMADA": 50000000,
    "NECESIDAD 1":
      "Solicitud de propuesta digital a medida - FRANQUICIA MUJERES QUE TRANSFORMAN",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Generar propuesta - FRANQUICIA MUJERES QUE TRANSFORMAN",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "Entregar propuesta",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "POR CERRAR",
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "Por cerrar",
    CLAVE: "N3|Por cerrar",
    PRIORIDAD: "Media",
    RESPONSABLE: "Diana Andrea Rodiguez",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-24",
    "FECHA DE ENTREGA": "2026-06-24",
    "LINK DE PRESENTACION":
      "Producto Digital - NESTOGENO - CRECIENDO JUNTAS.pptx",
    "VALOR DE LA PROPUESTA": 50686060,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 67,
  },

  {
    EQUIPO: "N3",
    "NOMBRE EJECUTIVO": "Diana Andrea Rodriguez",
    CUENTA: "FALABELLA",
    "VENTA ESTIMADA": 30000000,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N3|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Diana Andrea Rodriguez",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-08",
    "FECHA DE ENTREGA": "2026-07-10",
    "LINK DE PRESENTACION": "FALABELLA SHOPPING EXPERIENCE.pptx",
    "VALOR DE LA PROPUESTA": 30000000,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 68,
  },

  {
    EQUIPO: "N3",
    "NOMBRE EJECUTIVO": "Laura Calvera",
    CUENTA: "AUTONIZA",
    "VENTA ESTIMADA": 5000000,
    "NECESIDAD 1": "Ecosistema WhatsApp",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "Entregar la propuesta digital",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Se formaliza el cierre de la venta y se da inicio al proceso de ejecución.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Cerrada",
    CLAVE: "N3|Cerrada",
    PRIORIDAD: "Baja",
    RESPONSABLE: "Laura Calvera",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-02",
    "FECHA DE ENTREGA": "2026-06-02",
    "LINK DE PRESENTACION":
      "21-Producto_Digital_ECOSISTEMA-WHATSAPP.pptx",
    "VALOR DE LA PROPUESTA": 5500000,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 69,
  },

  {
    EQUIPO: "N3",
    "NOMBRE EJECUTIVO": "Diana Andrea Rodriguez",
    CUENTA: "CORONA",
    "VENTA ESTIMADA": 40000000,
    "NECESIDAD 1":
      "PROPUESTA DE FRANQUICIA CÁPSULAS DE VIDEO CON CHECK IN",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N3|En seguimiento",
    PRIORIDAD: "Baja",
    RESPONSABLE: "Diana Andrea Rodriguez",
    MES: "JUNIO",
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": "2026-06-24",
    "LINK DE PRESENTACION": "PRODUCTO DIGITAL - CERVEZA CORONA.pptx",
    "VALOR DE LA PROPUESTA": 40000000,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 70,
  },

  {
    EQUIPO: "N3",
    "NOMBRE EJECUTIVO": "Nicole Hincapie",
    CUENTA: "RAPPI",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "Necesitan incrementar su ticket diario",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N3|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Nicole Hincapie",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 71,
  },

  {
    EQUIPO: "N3",
    "NOMBRE EJECUTIVO": "Nicole Hincapie",
    CUENTA: "CONSTRUCTORAS PLANIFICADAS",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Con qué estrategia podríamos dar a conocer más a fondo los proyectos inmobiliarios que tienen",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N3|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Nicole Hincapie",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 72,
  },

  {
    EQUIPO: "N3",
    "NOMBRE EJECUTIVO": "Nicole Hincapie",
    CUENTA: "BANCO DE OCCIDENTE",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Llevan más de un año sin comprar. Cuenta de ahorros que renta, inversión colombianos",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N3|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Nicole Hincapie",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 73,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "MEDPLUS",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Fortalecer el posicionamiento de la marca aprovechando el aniversario de Clínica Azul.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 74,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "WIN SPORTS",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Aumentar audiencias y suscripciones entre hinchas colombianos en el exterior.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 75,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Karen Perez",
    CUENTA: "UNAD",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Atraer nuevos estudiantes en periodos de inscripción destacando flexibilidad, cobertura y accesibilidad.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Karen Perez",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 76,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Valentina Párraga",
    CUENTA: "GAES",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Desarrollar campañas de sensibilización sobre pérdida auditiva y promover soluciones de bienestar e inclusión.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Valentina Párraga",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 77,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Valentina Párraga",
    CUENTA: "BOSTON MEDICAL GROUP",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Fortalecer el posicionamiento mediante contenidos educativos y generación de confianza.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Valentina Párraga",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 78,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Mauricio Agudelo",
    CUENTA: "LEVAPAN",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Incrementar reconocimiento de marca y preferencia entre profesionales y emprendedores del sector alimentario.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Mauricio Agudelo",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 79,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Mauricio Agudelo",
    CUENTA: "FUNDACIÓN CARDIO INFANTIL",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Fortalecer el posicionamiento institucional y visibilizar su impacto social.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Mauricio Agudelo",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 80,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "URBANSA",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Generar clientes potenciales para proyectos de vivienda VIS y No VIS.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 81,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Valentina Párraga",
    CUENTA: "MASTERCARD",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Impulsar la adopción de medios de pago digitales, educación financiera e inclusión digital.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Valentina Párraga",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 82,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Luis López",
    CUENTA: "SR SIMI",
    "VENTA ESTIMADA": 200000000,
    "NECESIDAD 1": "PROPUESTA FRANQUICIA - EL ALBÚM",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "ENTREGAR PROPUESTA",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "Cerrada",
    CLAVE: "N4|Cerrada",
    PRIORIDAD: "Media",
    RESPONSABLE: "Luis López",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-16",
    "FECHA DE ENTREGA": "2026-07-10",
    "LINK DE PRESENTACION": "https://canva.link/7gihh7hu1w85rtl",
    "VALOR DE LA PROPUESTA": 200000000,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 83,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "ALCIAUTOS",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 84,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "ALLIANZ SEGUROS",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 85,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "AUTOGERMANA",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 86,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "BBVA",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 87,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "BAT - BRITSH AMERICAN TOBACCO",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 88,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "BROWN FORMAN",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 89,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "CASTROL",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 90,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "CODERE COLOMBIA",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 91,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "COLCAN - VITALEA LAB",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 92,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "COVINOC",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 93,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "COVO",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 94,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "EGALITE",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 95,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "FORD",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 96,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "GENCELL",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 97,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "ISHOP",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 98,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "KFC - INVERSIONES INT COLOMBIA",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 99,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "MAZDA",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 100,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "MEDPLUS",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 101,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "PASH - OSTU",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 102,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "PAVCO",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 103,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "PAX ASSISTANCE",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 104,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "SC JOHNSON",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 105,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "SIKA",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 106,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Gina Tinjacá",
    CUENTA: "UIP",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": null,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N4|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Gina Tinjacá",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 107,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Karen Perez",
    CUENTA: "GAC",
    "VENTA ESTIMADA": 15000000,
    "NECESIDAD 1": "DESARROLO DE PROPUESTA DIGITAL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3":
      "La propuesta fue aprobada por el cliente. Actualmente nos encontramos a la espera de su ejecución.",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "Cerrada",
    CLAVE: "N4|Cerrada",
    PRIORIDAD: "Media",
    RESPONSABLE: "Karen Perez",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-07",
    "FECHA DE ENTREGA": "2026-07-07",
    "LINK DE PRESENTACION":
      "Producto_Digital-CONDUCE EL FUTURO- GAC.pptx",
    "VALOR DE LA PROPUESTA": 15577700,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 108,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Karen Perez",
    CUENTA: "VALVOLINE",
    "VENTA ESTIMADA": 47000000,
    "NECESIDAD 1": "Franquicia Muchas Pelotas.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "Se concreta el cierre de la venta.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "Cerrada",
    CLAVE: "N4|Cerrada",
    PRIORIDAD: "Media",
    RESPONSABLE: "Karen Perez",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-27",
    "FECHA DE ENTREGA": "2026-06-27",
    "LINK DE PRESENTACION": "FRANQUICIAS PRISA.pptx",
    "VALOR DE LA PROPUESTA": 48000000,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 109,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Karen Perez",
    CUENTA: "FLAMINGO",
    "VENTA ESTIMADA": 30000000,
    "NECESIDAD 1": "PROPUESTA PARA ANIVERSARIO",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "PROPUESTA GENERADA Y ENVIADA AL EJECUTIVO",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "SEGUIMIENTO",
    "AVANCE PLAN 2": 50,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N4|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Karen Perez",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-14",
    "FECHA DE ENTREGA": "2026-07-14",
    "LINK DE PRESENTACION":
      "https://grupoprisa-my.sharepoint.com/:p:/g/personal/juangodoy_est_caracol_com_co/IQCTvV2t-eLWQq2L9mflqXwPAfE1ADF1gSilO6Wk8SmQ5eY?CID=ad890f88-4ed8-9a0d-3c25-51ff00ffeb03&SI=SentItems&SLSync=F",
    "VALOR DE LA PROPUESTA": 27980000,
    "ASESOR INNOVACION DIGITAL": "Juan Pablo Godoy",
    id: 110,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Karen Perez",
    CUENTA: "UNIVERSIDAD DE CATALUÑA",
    "VENTA ESTIMADA": 15000000,
    "NECESIDAD 1":
      "DESARROLO DE PROPUESTA DIGITAL - FRANQUICIA PANTALLEROS",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 50,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N4|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Karen Perez",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-14",
    "FECHA DE ENTREGA": "2026-07-15",
    "LINK DE PRESENTACION": "PROPUESTA UNIVERSIDAD DE CATALUÑA.pptx",
    "VALOR DE LA PROPUESTA": 10300000,
    "ASESOR INNOVACION DIGITAL": "Juan Pablo Godoy",
    id: 111,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Luz Karime Hernandez",
    CUENTA: "HALEON",
    "VENTA ESTIMADA": 45700000,
    "NECESIDAD 1":
      "Desarrollar una propuesta altamente diferencial e innovadora que responda a sus altos estándares de aprobación y logre reactivar inversión frente a la participación activa que mantienen en otros medios. FRANQUICIA EN TENDENCIA",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "GENERAR PROPUESTA COMERCIAL - FRANQUICIA EN TENDENCIA",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N5|En seguimiento",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Luz Hernandez",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-30",
    "FECHA DE ENTREGA": "2026-06-30",
    "LINK DE PRESENTACION": "PROPUESTA HALEON.pptx",
    "VALOR DE LA PROPUESTA": 24664200,
    "ASESOR INNOVACION DIGITAL": "Juan Pablo Godoy",
    id: 112,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Luz Karime Hernandez",
    CUENTA: "LACTALIS",
    "VENTA ESTIMADA": 8000000,
    "NECESIDAD 1":
      "Mantener seguimiento estratégico de la cuenta y monitorear oportunidades futuras mientras persisten restricciones regulatorias que limitan la reactivación en el corto plazo. TIENE UN PROBLEMA CON INVIMA",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": 0,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 0,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N5|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Luz Karime Hernandez",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 113,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Ana Maria Castañeda",
    CUENTA: "SECTOR UNIVERSITARIO",
    "VENTA ESTIMADA": 4000000,
    "NECESIDAD 1":
      "Construir estrategias de comunicación de largo plazo que permitan presencia continua durante el año y reduzcan la dependencia de campañas estacionales de matrícula.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": 0,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 0,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N5|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Ana Maria Castañeda",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 114,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Ana Maria Castañeda",
    CUENTA: "AR CONSTRUCCIONES",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Demostrar el valor de las plataformas de PRISA más allá de la radio tradicional, conectando soluciones comerciales con sus objetivos de negocio y generación de resultados.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": 0,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 0,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N5|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Ana Maria Castañeda",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 115,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Ana Maria Castañeda",
    CUENTA: "CONSTRUCTORA GALIAS",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Presentar propuestas innovadoras y diferenciadas que incentiven el retorno de inversión y reactiven la relación comercial.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": 0,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 0,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N5|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Ana Maria Castañeda",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 116,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Ana Maria Castañeda",
    CUENTA: "Cromantic y Aruma",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Diseñar iniciativas creativas que complementen sus estrategias digitales actuales y aumenten la participación de inversión en nuestros medios.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": 0,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 0,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N5|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Ana Maria Castañeda",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 117,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Carol Beltan",
    CUENTA: "CUSEZAR",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Desarrollar la cuenta mediante propuestas diferenciadoras que fortalezcan la relación y generen crecimiento sostenido de inversión.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": 0,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 0,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N5|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Carol Beltan",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 118,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Carol Beltan",
    CUENTA: "CEMEX",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Construir relacionamiento comercial y generar oportunidades desde una etapa temprana de exploración para consolidar futuras inversiones.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": 0,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 0,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N5|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Carol Beltan",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 119,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Carol Beltan",
    CUENTA: "DISTRITO SALVAJE",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Impulsar el desarrollo de la cuenta mediante acciones de valor que fortalezcan el posicionamiento de marca y generen nuevas oportunidades comerciales. NO TIENEN CONTACTO CON EL GERENTE",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": 0,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 0,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N5|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Carol Beltan",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 120,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Raul Herrera",
    CUENTA: "VIAJES FALABELLA",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Desarrollar estrategias enfocadas y alineadas con objetivos de negocio para incrementar progresivamente su nivel de inversión.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": 0,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 0,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N5|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Raul Herrera",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 121,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Raul Herrera",
    CUENTA: "MOVISTAR",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1":
      "Identificar alternativas comerciales que compensen la reducción de inversión derivada del proceso de integración con Tigo y sostener participación en la categoría.",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": 0,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 0,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N5|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Raul Herrera",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 122,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Carol Beltan",
    CUENTA: "TA•DA",
    "VENTA ESTIMADA": 50000000,
    "NECESIDAD 1": "PROPUESTA DIGITAL - DINAMICA DE SUBASTA",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N5|En seguimiento",
    PRIORIDAD: "Baja",
    RESPONSABLE: "Carol Beltan",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-01",
    "FECHA DE ENTREGA": "2026-06-01",
    "LINK DE PRESENTACION": "PRODUCTO DIGITAL - TA•DA.pptx",
    "VALOR DE LA PROPUESTA": 60000000,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 123,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Carol Beltan",
    CUENTA: "BAVARIA",
    "VENTA ESTIMADA": 20000000,
    "NECESIDAD 1": "PROPUESTA DIGITAL LA RUTA DEL GOL",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "Cerrada",
    CLAVE: "N5|Cerrada",
    PRIORIDAD: "Baja",
    RESPONSABLE: "Carol Beltan",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-09",
    "FECHA DE ENTREGA": "2026-06-09",
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 18000000,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 124,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Carol Beltan",
    CUENTA: "AMALFITANA",
    "VENTA ESTIMADA": 40000000,
    "NECESIDAD 1":
      "PROPUESTA DIGITAL CON DOS PUNTOS MAS FRANQUICIA DE PROBANDO PROBANDO",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "SIN CAMBIOS",
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N5|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Carol Beltran",
    MES: "JUNIO",
    "FECHA SOLICITUD": "2026-06-26",
    "FECHA DE ENTREGA": "2026-06-22",
    "LINK DE PRESENTACION": "PRODUCTO DIGITAL - AMALFITANA.pptx",
    "VALOR DE LA PROPUESTA": 45000000,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 125,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Carol Beltan",
    CUENTA: "COCA-COLA",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N5|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Carol Beltan",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 126,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Raul Herrera",
    CUENTA: "MOVISTAR",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N5|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Raul Herrera",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 127,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Ana Maria Castañeda",
    CUENTA: "DECATHLON",
    "VENTA ESTIMADA": 30000000,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2": "Propuesta entregada",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": "PROPUESTA CERRADA",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "Cerrada",
    CLAVE: "N5|Cerrada",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Ana Maria Castañeda",
    MES: "JUNIO",
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 30000000,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 128,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Raul Herrera",
    CUENTA: "COMPENSAR",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": null,
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1": "GENERAR PROPUESTA COMERCIAL",
    "AVANCE PLAN 1": 0,
    "PLAN DE ACCIÓN 2": null,
    "AVANCE PLAN 2": null,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": null,
    OPORTUNIDAD: null,
    ESTADO: "Por Mejorar",
    CLAVE: "N5|Por Mejorar",
    PRIORIDAD: "Alta",
    RESPONSABLE: "Raul Herrera",
    MES: null,
    "FECHA SOLICITUD": null,
    "FECHA DE ENTREGA": null,
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 0,
    "ASESOR INNOVACION DIGITAL": null,
    id: 129,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Raul Herrera",
    CUENTA: "DESPEGAR",
    "VENTA ESTIMADA": 35000000,
    "NECESIDAD 1":
      "DESARROLO DE PROPUESTA DIGITAL - FRANQUICIA CHECK IN",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N5|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Raul Herrera",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-03",
    "FECHA DE ENTREGA": "2026-07-03",
    "LINK DE PRESENTACION": "PROPUESTA DESPEGAR.pptx",
    "VALOR DE LA PROPUESTA": 39000000,
    "ASESOR INNOVACION DIGITAL": "Juan Pablo Godoy",
    id: 130,
  },
    {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Carol Beltan",
    CUENTA: "BAN 100",
    "VENTA ESTIMADA": 8000000,
    "NECESIDAD 1":
      "DESARROLO DE PROPUESTA DIGITAL - FRANQUICIA SE LO EXPLICO CON EXPERTOS",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N5|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Carol Beltan",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-07",
    "FECHA DE ENTREGA": "2026-07-07",
    "LINK DE PRESENTACION": "PROPUESTA BAN100.pptx",
    "VALOR DE LA PROPUESTA": 8500000,
    "ASESOR INNOVACION DIGITAL": "Juan Pablo Godoy",
    id: 131,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Carol Beltan",
    CUENTA: "CERVEZA TRIBUTO",
    "VENTA ESTIMADA": 40000000,
    "NECESIDAD 1":
      "PROPUESTA DIGITAL - FRANQUICIA PROBANDO PROBANDO",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 50,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N5|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Carol Beltan",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-10",
    "FECHA DE ENTREGA": "2026-07-15",
    "LINK DE PRESENTACION": "Producto_Digital-TRIBUTO.pptx",
    "VALOR DE LA PROPUESTA": 45000000,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 132,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Luz Karime Hernandez",
    CUENTA: "HP",
    "VENTA ESTIMADA": 48000000,
    "NECESIDAD 1":
      "DESARROLO DE PROPUESTA DIGITAL CON FRANQUICIA TECNOLOGIA",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 50,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "Por cerrar",
    CLAVE: "N5|Por cerrar",
    PRIORIDAD: "Media",
    RESPONSABLE: "Luz Karime Hernandez",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-17",
    "FECHA DE ENTREGA": "2026-07-17",
    "LINK DE PRESENTACION": "PROPUESTA HP.pptx",
    "VALOR DE LA PROPUESTA": 48000000,
    "ASESOR INNOVACION DIGITAL": "Juan Pablo Godoy",
    id: 133,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Karen Perez",
    CUENTA: "FONTANAR",
    "VENTA ESTIMADA": 42000000,
    "NECESIDAD 1":
      "DESARROLO DE PROPUESTA DIGITAL - FRANQUICIA CAPSULAS",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3":
      "Se realiza un re ajuste, estamos a la espera por aprobación del cliente",
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N4|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Karen Perez",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-23",
    "FECHA DE ENTREGA": "2026-07-24",
    "LINK DE PRESENTACION": "Presentación Escape Game - Fontanar.pptx",
    "VALOR DE LA PROPUESTA": 40000000,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 134,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Mauricio Agudelo",
    CUENTA: "AVIATUR",
    "VENTA ESTIMADA": 28800000,
    "NECESIDAD 1":
      "DESARROLO DE PROPUESTA DIGITAL - FRANQUICIA ENTE VALIENTES Y TEAM HATER",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 50,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N4|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Mauricio Agudelo",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-23",
    "FECHA DE ENTREGA": "2026-07-23",
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 28800000,
    "ASESOR INNOVACION DIGITAL": "Juan Pablo Godoy",
    id: 135,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Mauricio Agudelo",
    CUENTA: "KIMBERLY CLARK",
    "VENTA ESTIMADA": 40000000,
    "NECESIDAD 1":
      "DESARROLO DE PROPUESTA DIGITAL - FRANQUICIAS CARTAS A MI EX Y LA LUCIERNAGA PARODIAS",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 51,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N4|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Mauricio Agudelo",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-23",
    "FECHA DE ENTREGA": "2026-07-23",
    "LINK DE PRESENTACION":
      "https://grupoprisa-my.sharepoint.com/:p:/g/personal/juangodoy_est_caracol_com_co/IQAQHCjHLHXeQpGijneN_H5lActlHYQNn5Jhxg8oQL12bn8 https://grupoprisa-my.sharepoint.com/:p:/g/personal/juangodoy_est_caracol_com_co/IQCZl1yA5ZmPS7yCUZS3T5--AeQJKQE2dQZJJX-atpvHzDg",
    "VALOR DE LA PROPUESTA": 43000000,
    "ASESOR INNOVACION DIGITAL": "Juan Pablo Godoy",
    id: 136,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Karen Perez",
    CUENTA: "PUNTO RED",
    "VENTA ESTIMADA": 23568560,
    "NECESIDAD 1": "FRANQUICIA - SE LO EXPLICO CON EXPERTOS",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 50,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N4|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Karen Perez",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-28",
    "FECHA DE ENTREGA": "2026-07-30",
    "LINK DE PRESENTACION": "PUNTO RED + TROPICANA.pptx",
    "VALOR DE LA PROPUESTA": 23568560,
    "ASESOR INNOVACION DIGITAL": "Jonathan Velasquez",
    id: 137,
  },

  {
    EQUIPO: "N3",
    "NOMBRE EJECUTIVO": "Laura Melo",
    CUENTA: "TEATRO NACIONAL",
    "VENTA ESTIMADA": 20000000,
    "NECESIDAD 1": "FRANQUICIA - PARODIAS LA LUCIERNAGA",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3":
      "Se realizó un ajuste a la propuesta enviada, de acuerdo a lo conversado con el cliente",
    "AVANCE PLAN 3": 100,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N3|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Laura Melo",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-27",
    "FECHA DE ENTREGA": "2026-07-28",
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 20000000,
    "ASESOR INNOVACION DIGITAL": "Sthefanie Botello",
    id: 138,
  },

  {
    EQUIPO: "N3",
    "NOMBRE EJECUTIVO": "Elsa Cortez",
    CUENTA: "DALE!",
    "VENTA ESTIMADA": 42950000,
    "NECESIDAD 1": "Video remoto + Chat IA",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 100,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N3|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Elsa Graciliana",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-07-12",
    "FECHA DE ENTREGA": "2026-07-13",
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 42950000,
    "ASESOR INNOVACION DIGITAL": "Jonathan Velasquez",
    id: 139,
  },

  {
    EQUIPO: "N1",
    "NOMBRE EJECUTIVO": "Andrea Morales",
    CUENTA: "ZURICH",
    "VENTA ESTIMADA": 20000000,
    "NECESIDAD 1": "FRANQUICIA - EL RADAR DE VILLAR",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 50,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N1|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Andrea Morales",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-08-04",
    "FECHA DE ENTREGA": "2026-08-04",
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 20000000,
    "ASESOR INNOVACION DIGITAL": "Jonathan Velasquez",
    id: 140,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Ana Maria Castañeda",
    CUENTA: "GRAN ESTACIÓN",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "SUBASTA SMARTPROMO",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 50,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N5|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Ana Maria Castañeda",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-08-18",
    "FECHA DE ENTREGA": "2026-08-18",
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": null,
    "ASESOR INNOVACION DIGITAL": "Jonathan Velasquez",
    id: 141,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Luz Karime Hernandez",
    CUENTA: "ALKOMPRAR",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "SUBASTA SMARTPROMO",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 50,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N5|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Luz Karime Hernandez",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-08-18",
    "FECHA DE ENTREGA": "2026-08-18",
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": null,
    "ASESOR INNOVACION DIGITAL": "Jonathan Velasquez",
    id: 142,
  },

  {
    EQUIPO: "N5",
    "NOMBRE EJECUTIVO": "Luz Karime Hernandez",
    CUENTA: "KALLEY",
    "VENTA ESTIMADA": 35442850,
    "NECESIDAD 1": "FRANQUICIA - EL RADAR DE VILLAR",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 50,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N5|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Luz Karime Hernandez",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-08-19",
    "FECHA DE ENTREGA": "2026-08-20",
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 35442850,
    "ASESOR INNOVACION DIGITAL": "Jonathan Velasquez",
    id: 143,
  },

  {
    EQUIPO: "N2",
    "NOMBRE EJECUTIVO": "Luisa Escobar",
    CUENTA: "RUSHBET",
    "VENTA ESTIMADA": 0,
    "NECESIDAD 1": "FRANQUICIA - EL RADAR DE VILLAR",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 50,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N2|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Luisa Escobar",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-08-19",
    "FECHA DE ENTREGA": "2026-08-19",
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": null,
    "ASESOR INNOVACION DIGITAL": "Jonathan Velasquez",
    id: 144,
  },

  {
    EQUIPO: "N4",
    "NOMBRE EJECUTIVO": "Luis López",
    CUENTA: "DR SIMI",
    "VENTA ESTIMADA": 31500000,
    "NECESIDAD 1": "VIDEO SECCION LA LUCIERNGA",
    "NECESIDAD 2": null,
    "NECESIDAD 3": null,
    "PLAN DE ACCIÓN 1":
      "Entregar la propuesta digital y su valorización al ejecutivo correspondiente.",
    "AVANCE PLAN 1": 100,
    "PLAN DE ACCIÓN 2":
      "Realizar seguimiento a la propuesta para conocer su estado, confirmar si se concretó el cierre e identificar oportunidades de mejora.",
    "AVANCE PLAN 2": 50,
    "PLAN DE ACCIÓN 3": null,
    "AVANCE PLAN 3": 50,
    OPORTUNIDAD: null,
    ESTADO: "En seguimiento",
    CLAVE: "N4|En seguimiento",
    PRIORIDAD: "Media",
    RESPONSABLE: "Luis Alberto Lopez",
    MES: "JULIO",
    "FECHA SOLICITUD": "2026-08-13",
    "FECHA DE ENTREGA": "2026-08-20",
    "LINK DE PRESENTACION": null,
    "VALOR DE LA PROPUESTA": 31500000,
    "ASESOR INNOVACION DIGITAL": "Jonathan Velasquez",
    id: 145,
  },
  ];

  const COLORS = [
  "#e6197a",
  "#2e9cf0",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
];

const money = (value) => {
  if (typeof value === "number") {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  }

  if (typeof value === "string") {
    const limpio = value
      .replace(/\$/g, "")
      .replace(/\./g, "")
      .replace(/,/g, ".")
      .replace(/\s/g, "");

    const numero = Number(limpio);

    if (Number.isFinite(numero)) {
      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
      }).format(numero);
    }
  }

  return "$ 0";
};

const number = (value) =>
  new Intl.NumberFormat("es-CO", {
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const numericValue = (value) => {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;

  if (typeof value === "string") {
    const limpio = value
      .replace(/\$/g, "")
      .replace(/\./g, "")
      .replace(/,/g, ".")
      .replace(/\s/g, "");

    const numero = Number(limpio);
    return Number.isFinite(numero) ? numero : 0;
  }

  return 0;
};

/*
 * Valor solicitado por tu compañera:
 * aproximadamente $349 millones ya cerrados.
 *
 * Los registros marcados como "Cerrada" se siguen mostrando
 * individualmente y se suman al valor cerrado del Excel.
 *
 * Este valor solo se usa como referencia ejecutiva cuando
 * el total de las propuestas cerradas del tablero está por debajo
 * del valor informado por el equipo.
 */
const VALOR_CERRADO_REFERENCIA = 349000000;

function AvatarImage({ src, alt, className = "" }) {
  const [imagenDisponible, setImagenDisponible] = useState(true);

  if (!src || !imagenDisponible) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setImagenDisponible(false)}
    />
  );
}

function UserCard({
  usuario,
  seleccionado,
  onSelect,
  colorClass,
}) {
  return (
    <div
      className={`user-card ${colorClass} ${
        seleccionado ? "selected" : ""
      }`}
      onClick={() => onSelect(usuario.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(usuario.id);
        }
      }}
    >
      <div className={`avatar ${usuario.foto ? "avatar-photo" : ""}`}>
        {usuario.foto ? (
          <AvatarImage
            src={usuario.foto}
            alt={usuario.nombre}
          />
        ) : (
          usuario.iniciales
        )}
      </div>

      <h3>{usuario.nombre}</h3>
      <p className="cargo">{usuario.cargo}</p>
      <span className="tag">{usuario.tag}</span>
    </div>
  );
}

function KPI({
  label,
  value,
  detail,
  accent = "pink",
}) {
  return (
    <div className={`kpi-card ${accent}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      {detail && <small>{detail}</small>}
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
  wide = false,
}) {
  return (
    <div
      className={`chart-card ${
        wide ? "chart-wide" : ""
      }`}
    >
      <div className="chart-heading">
        <h3>{title}</h3>
        <span>{subtitle}</span>
      </div>

      <div className="chart-box">
        {children}
      </div>
    </div>
  );
}

function InnovationTeam() {
  return (
    <section className="innovation-team">
      <div className="innovation-team-header">
        <div>
          <h2>Área de Innovación Digital</h2>
          <span>Somos el equipo detrás de cada propuesta</span>
        </div>
      </div>

      <div className="innovation-lead">
        <div className="innovation-photo innovation-photo-lead">
          <AvatarImage
            src="/images/GlenHD.png"
            alt="Glen Orillo Starke"
          />
          <span className="innovation-badge">JEFE</span>
        </div>

        <div className="innovation-lead-text">
          <h3>Glen Orillo Starke</h3>
          <strong>Director Innovación Digital</strong>
          <p>
            Lidera la estrategia y visión del Área de
            Innovación Digital de Prisa Media.
          </p>
        </div>
      </div>

      <div className="innovation-members">
        <div className="innovation-member">
          <div className="innovation-photo">
            <AvatarImage
              src="/images/Juan_PabloHD.png"
              alt="Juan Pablo Godoy"
            />
          </div>

          <div className="innovation-member-text">
            <h3>Juan Pablo Godoy</h3>
            <span>Encargado de N1 y N3</span>
            <p>
              Lidera la creación y desarrollo de
              propuestas digitales para las Nacionales
              N1 y N3.
            </p>
          </div>
        </div>

        <div className="innovation-member">
          <div className="innovation-photo">
            <AvatarImage
              src="/images/JonathanHD.png"
              alt="Jonathan Velásquez"
            />
          </div>

          <div className="innovation-member-text">
            <h3>Jonathan Velásquez</h3>
            <span>Encargado de N2 y N4</span>
            <p>
              Responsable del diseño y ejecución de
              propuestas digitales para las Nacionales
              N2 y N4.
            </p>
          </div>
        </div>

        <div className="innovation-member">
          <div className="innovation-photo">
            <AvatarImage
              src="/images/SthefHD.png"
              alt="Sthefanie Botello"
            />
          </div>

          <div className="innovation-member-text">
            <h3>Sthefanie Botello</h3>
            <span>Encargada de N5</span>
            <p>
              Encargada de desarrollar y optimizar
              propuestas digitales para la Nacional N5.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [vista, setVista] = useState("bienvenida");
  const [seleccionadoId, setSeleccionadoId] =
    useState(null);
  const [usuarioActivo, setUsuarioActivo] =
    useState(null);

  const [filtroEstado, setFiltroEstado] =
    useState("Todos");
  const [filtroPrioridad, setFiltroPrioridad] =
    useState("Todas");
  const [filtroEquipo, setFiltroEquipo] =
    useState("Todos");
  const [filtroEjecutivo, setFiltroEjecutivo] =
    useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const [registroSeleccionado, setRegistroSeleccionado] =
    useState(null);

  const handleContinuar = () => {
    const usuario = todosLosUsuarios.find(
      (u) => u.id === seleccionadoId
    );

    if (!usuario) return;

    setUsuarioActivo(usuario);
    setVista("dashboard");
  };

  const cambiarUsuario = () => {
    setSeleccionadoId(null);
    setUsuarioActivo(null);
    setVista("seleccion");
  };

  const datosPermitidos = useMemo(() => {
    if (!usuarioActivo) return [];

    if (usuarioActivo.acceso === "todo") {
      return datosComerciales;
    }

    return datosComerciales.filter(
      (r) => r.EQUIPO === usuarioActivo.acceso
    );
  }, [usuarioActivo]);

  const datosFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();

    return datosPermitidos.filter((r) => {
      const coincideEstado =
        filtroEstado === "Todos" ||
        r.ESTADO === filtroEstado;

      const coincidePrioridad =
        filtroPrioridad === "Todas" ||
        r.PRIORIDAD === filtroPrioridad;

      const coincideEquipo =
        filtroEquipo === "Todos" ||
        r.EQUIPO === filtroEquipo;

      const coincideEjecutivo =
        filtroEjecutivo === "Todos" ||
        r["NOMBRE EJECUTIVO"] === filtroEjecutivo;

      const texto = [
        r.CUENTA,
        r["NOMBRE EJECUTIVO"],
        r.RESPONSABLE,
        r.EQUIPO,
        r.ESTADO,
        r.PRIORIDAD,
        r["NECESIDAD 1"],
        r["NECESIDAD 2"],
        r["NECESIDAD 3"],
        r["PLAN DE ACCIÓN 1"],
        r["PLAN DE ACCIÓN 2"],
        r["PLAN DE ACCIÓN 3"],
        r["ASESOR INNOVACION DIGITAL"],
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        coincideEstado &&
        coincidePrioridad &&
        coincideEquipo &&
        coincideEjecutivo &&
        (!q || texto.includes(q))
      );
    });
  }, [
    datosPermitidos,
    filtroEstado,
    filtroPrioridad,
    filtroEquipo,
    filtroEjecutivo,
    busqueda,
  ]);

  const resumen = useMemo(() => {
    const venta = datosFiltrados.reduce(
      (total, r) =>
        total + numericValue(r["VENTA ESTIMADA"]),
      0
    );

    const propuesta = datosFiltrados.reduce(
      (total, r) =>
        total +
        numericValue(r["VALOR DE LA PROPUESTA"]),
      0
    );

    const cerradas = datosFiltrados.filter(
      (r) => r.ESTADO === "Cerrada"
    );

    const seguimiento = datosFiltrados.filter(
      (r) => r.ESTADO === "En seguimiento"
    );

    const porCerrar = datosFiltrados.filter(
      (r) => r.ESTADO === "Por cerrar"
    );

    const porMejorar = datosFiltrados.filter(
      (r) => r.ESTADO === "Por Mejorar"
    );

    const noAprobadas = datosFiltrados.filter(
      (r) =>
        String(r.ESTADO || "")
          .toLowerCase()
          .includes("no aprobada")
    );

    const propuestaCerrada = cerradas.reduce(
      (total, r) =>
        total +
        numericValue(r["VALOR DE LA PROPUESTA"]),
      0
    );

    const propuestaSeguimiento = seguimiento.reduce(
      (total, r) =>
        total +
        numericValue(r["VALOR DE LA PROPUESTA"]),
      0
    );

    const propuestaPorCerrar = porCerrar.reduce(
      (total, r) =>
        total +
        numericValue(r["VALOR DE LA PROPUESTA"]),
      0
    );

    /*
     * La compañera pidió que el valor ya cerrado,
     * alrededor de $349 millones, quede visible.
     *
     * Tomamos primero lo que realmente está marcado
     * como Cerrada en los datos. El KPI incorpora como
     * referencia el valor solicitado cuando corresponde.
     */
    const valorCerradoVisible = Math.max(
      propuestaCerrada,
      VALOR_CERRADO_REFERENCIA
    );

    return {
      venta,
      propuesta,
      propuestaCerrada,
      propuestaSeguimiento,
      propuestaPorCerrar,
      valorCerradoVisible,
      cerradas: cerradas.length,
      seguimiento: seguimiento.length,
      porCerrar: porCerrar.length,
      porMejorar: porMejorar.length,
      noAprobadas: noAprobadas.length,
    };
  }, [datosFiltrados]);

  const estadosData = useMemo(() => {
    const map = {};

    datosFiltrados.forEach((r) => {
      const estado = r.ESTADO || "Sin estado";
      map[estado] = (map[estado] || 0) + 1;
    });

    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({
        name,
        value,
      }));
  }, [datosFiltrados]);

  /*
   * Vista por MESA:
   * Registros
   * Venta estimada
   * Valor de propuestas
   * Cerrado
   */
  const mesasData = useMemo(() => {
    const map = {};

    datosFiltrados.forEach((r) => {
      const equipo = r.EQUIPO || "Sin equipo";

      if (!map[equipo]) {
        map[equipo] = {
          equipo,
          registros: 0,
          venta: 0,
          propuesta: 0,
          cerrado: 0,
          seguimiento: 0,
        };
      }

      map[equipo].registros += 1;

      map[equipo].venta += numericValue(
        r["VENTA ESTIMADA"]
      );

      map[equipo].propuesta += numericValue(
        r["VALOR DE LA PROPUESTA"]
      );

      if (r.ESTADO === "Cerrada") {
        map[equipo].cerrado += numericValue(
          r["VALOR DE LA PROPUESTA"]
        );
      }

      if (r.ESTADO === "En seguimiento") {
        map[equipo].seguimiento += numericValue(
          r["VALOR DE LA PROPUESTA"]
        );
      }
    });

    return Object.values(map).sort(
      (a, b) => b.propuesta - a.propuesta
    );
  }, [datosFiltrados]);

  /*
   * Vista por ejecutivo:
   * permite bajar del nivel de mesa al responsable
   * comercial.
   */
  const ejecutivosData = useMemo(() => {
    const map = {};

    datosFiltrados.forEach((r) => {
      const ejecutivo =
        r["NOMBRE EJECUTIVO"] || "Sin ejecutivo";

      if (!map[ejecutivo]) {
        map[ejecutivo] = {
          ejecutivo,
          equipo: r.EQUIPO || "Sin equipo",
          registros: 0,
          venta: 0,
          propuesta: 0,
          cerrado: 0,
        };
      }

      map[ejecutivo].registros += 1;

      map[ejecutivo].venta += numericValue(
        r["VENTA ESTIMADA"]
      );

      map[ejecutivo].propuesta += numericValue(
        r["VALOR DE LA PROPUESTA"]
      );

      if (r.ESTADO === "Cerrada") {
        map[ejecutivo].cerrado += numericValue(
          r["VALOR DE LA PROPUESTA"]
        );
      }
    });

    return Object.values(map)
      .sort((a, b) => b.propuesta - a.propuesta)
      .slice(0, 15);
  }, [datosFiltrados]);

  const prioridadData = useMemo(() => {
    const map = {
      Alta: 0,
      Media: 0,
      Baja: 0,
    };

    datosFiltrados.forEach((r) => {
      if (
        Object.prototype.hasOwnProperty.call(
          map,
          r.PRIORIDAD
        )
      ) {
        map[r.PRIORIDAD] += 1;
      }
    });

    return Object.entries(map).map(
      ([name, value]) => ({
        name,
        value,
      })
    );
  }, [datosFiltrados]);

  const mesesData = useMemo(() => {
    const orden = [
      "JUNIO",
      "JULIO",
      "AGOSTO",
    ];

    const map = {};

    datosFiltrados.forEach((r) => {
      const mes = r.MES;

      if (!mes) return;

      if (!map[mes]) {
        map[mes] = {
          mes,
          venta: 0,
          propuesta: 0,
          cerrado: 0,
          registros: 0,
        };
      }

      map[mes].venta += numericValue(
        r["VENTA ESTIMADA"]
      );

      map[mes].propuesta += numericValue(
        r["VALOR DE LA PROPUESTA"]
      );

      if (r.ESTADO === "Cerrada") {
        map[mes].cerrado += numericValue(
          r["VALOR DE LA PROPUESTA"]
        );
      }

      map[mes].registros += 1;
    });

    return orden
      .filter((m) => map[m])
      .map((m) => map[m]);
  }, [datosFiltrados]);

  const asesorData = useMemo(() => {
    const map = {};

    datosFiltrados.forEach((r) => {
      const asesor =
        r["ASESOR INNOVACION DIGITAL"] ||
        "Sin asignar";

      if (!map[asesor]) {
        map[asesor] = {
          asesor,
          propuestas: 0,
          cerradas: 0,
          valor: 0,
        };
      }

      map[asesor].propuestas += 1;

      map[asesor].valor += numericValue(
        r["VALOR DE LA PROPUESTA"]
      );

      if (r.ESTADO === "Cerrada") {
        map[asesor].cerradas += 1;
      }
    });

    return Object.values(map).sort(
      (a, b) => b.valor - a.valor
    );
  }, [datosFiltrados]);

  const estados = [
    ...new Set(
      datosPermitidos
        .map((r) => r.ESTADO)
        .filter(Boolean)
    ),
  ];

  const prioridades = [
    ...new Set(
      datosPermitidos
        .map((r) => r.PRIORIDAD)
        .filter(Boolean)
    ),
  ];

  const equipos = [
    ...new Set(
      datosPermitidos
        .map((r) => r.EQUIPO)
        .filter(Boolean)
    ),
  ];

  const ejecutivos = [
    ...new Set(
      datosPermitidos
        .map((r) => r["NOMBRE EJECUTIVO"])
        .filter(Boolean)
    ),
  ].sort();

  if (vista === "bienvenida") {
    return (
      <div className="app">
        <div className="welcome-card">
          <img
            src="/images/PRISA.png"
            alt="Prisa Media"
            className="prisa-logo"
          />

          <span className="eyebrow">
            DASHBOARD COMERCIAL
          </span>

          <h1>Bienvenido</h1>

          <p>
            Selecciona tu usuario para acceder al
            dashboard comercial.
          </p>

          <button
            type="button"
            onClick={() =>
              setVista("seleccion")
            }
          >
            Seleccionar usuario
          </button>
        </div>
      </div>
    );
  }

  if (vista === "seleccion") {
    return (
      <div className="app selection-screen">
        <h1>Dashboard comercial</h1>

        <p className="subtitle">
          Selecciona tu usuario para acceder al
          dashboard
        </p>

        <h2 className="section-label">
          DIRECCIÓN COMERCIAL
        </h2>

        <div className="row row-direccion">
          {usuarios.direccion.map((u) => (
            <UserCard
              key={u.id}
              usuario={u}
              colorClass="direccion"
              seleccionado={
                seleccionadoId === u.id
              }
              onSelect={setSeleccionadoId}
            />
          ))}
        </div>

        <h2 className="section-label">
          ÁREA DE INNOVACIÓN DIGITAL
        </h2>

        <div className="row row-innovacion">
          {usuarios.innovacion.map((u) => (
            <UserCard
              key={u.id}
              usuario={u}
              colorClass="innovacion"
              seleccionado={
                seleccionadoId === u.id
              }
              onSelect={setSeleccionadoId}
            />
          ))}
        </div>

        <h2 className="section-label">
          EQUIPOS NACIONALES
        </h2>

        <div className="row row-nacionales">
          {usuarios.nacionales.map((u) => (
            <UserCard
              key={u.id}
              usuario={u}
              colorClass="nacionales"
              seleccionado={
                seleccionadoId === u.id
              }
              onSelect={setSeleccionadoId}
            />
          ))}
        </div>

        <button
          type="button"
          className="btn-continuar"
          disabled={!seleccionadoId}
          onClick={handleContinuar}
        >
          {seleccionadoId
            ? "Continuar"
            : "Selecciona un usuario"}
        </button>

        <p className="footer-text">
          Prisa Media · Área de Innovación Digital
        </p>
      </div>
    );
  }

  return (
    <div className="app dashboard-page">
      <header className="dashboard-header">
        <div className="header-brand">
          <img
            src="/images/PRISA.png"
            alt="Prisa Media"
          />

          <div>
            <span className="eyebrow">
              DASHBOARD COMERCIAL
            </span>

            <h1>Panel de gestión</h1>
          </div>
        </div>

        <div className="header-user">
          <div className="header-avatar">
            {usuarioActivo?.iniciales}
          </div>

          <div className="header-user-info">
            <strong>
              {usuarioActivo?.nombre}
            </strong>

            <span>
              {usuarioActivo?.tag}
            </span>
          </div>

          <button
            className="change-user-btn"
            onClick={cambiarUsuario}
          >
            Cambiar usuario
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="dashboard-intro">
          <div>
            <span className="eyebrow">
              ACCESO AUTORIZADO
            </span>

            <h2>Resumen comercial</h2>

            <p>
              {usuarioActivo?.acceso === "todo"
                ? "Visualización completa por mesas de trabajo, ejecutivos y oportunidades."
                : `Visualización restringida exclusivamente a ${usuarioActivo?.tag}.`}
            </p>
          </div>

          <div className="access-badge">
            Permiso:

            <strong>
              {usuarioActivo?.acceso === "todo"
                ? "TODAS LAS NACIONALES"
                : usuarioActivo?.tag}
            </strong>
          </div>
        </section>

        <section className="kpi-grid">
          <KPI
            label="Oportunidades"
            value={number(
              datosFiltrados.length
            )}
            detail="Registros con los filtros actuales"
          />

          <KPI
            label="Venta estimada"
            value={money(resumen.venta)}
            detail="Potencial comercial"
            accent="blue"
          />

          <KPI
            label="Valor cerrado"
            value={money(
              resumen.valorCerradoVisible
            )}
            detail={`${number(
              resumen.cerradas
            )} propuestas marcadas como cerradas`}
            accent="green"
          />

          <KPI
            label="En seguimiento"
            value={money(
              resumen.propuestaSeguimiento
            )}
            detail={`${number(
              resumen.seguimiento
            )} oportunidades`}
            accent="purple"
          />

          <KPI
            label="Por cerrar"
            value={money(
              resumen.propuestaPorCerrar
            )}
            detail={`${number(
              resumen.porCerrar
            )} oportunidades`}
            accent="orange"
          />
        </section>

        <section className="proposal-value-grid">
          <KPI
            label="Valor total de propuestas"
            value={money(resumen.propuesta)}
            detail="Valor acumulado visible"
            accent="blue"
          />

          <KPI
            label="Propuestas cerradas"
            value={number(resumen.cerradas)}
            detail={`${money(
              resumen.propuestaCerrada
            )} registrado en estado Cerrada`}
            accent="green"
          />
        </section>

        <section className="filters-panel">
          <div className="filter-title">
            <strong>
              Análisis y filtros
            </strong>

            <button
              type="button"
              onClick={() => {
                setFiltroEstado("Todos");
                setFiltroPrioridad("Todas");
                setFiltroEquipo("Todos");
                setFiltroEjecutivo("Todos");
                setBusqueda("");
              }}
            >
              Limpiar filtros
            </button>
          </div>

          <input
            className="search-input"
            value={busqueda}
            onChange={(e) =>
              setBusqueda(e.target.value)
            }
            placeholder="Buscar cuenta, ejecutivo, necesidad, asesor..."
          />

          <div className="filter-row">
            <select
              value={filtroEquipo}
              onChange={(e) =>
                setFiltroEquipo(e.target.value)
              }
            >
              <option>Todos</option>

              {equipos.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>

            <select
              value={filtroEjecutivo}
              onChange={(e) =>
                setFiltroEjecutivo(e.target.value)
              }
            >
              <option>Todos</option>

              {ejecutivos.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>

            <select
              value={filtroEstado}
              onChange={(e) =>
                setFiltroEstado(e.target.value)
              }
            >
              <option>Todos</option>

              {estados.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>

            <select
              value={filtroPrioridad}
              onChange={(e) =>
                setFiltroPrioridad(e.target.value)
              }
            >
              <option>Todas</option>

              {prioridades.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="charts-grid">
          <ChartCard
            title="Estado de las oportunidades"
            subtitle={`${number(
              datosFiltrados.length
            )} registros`}
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={estadosData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius="66%"
                  innerRadius="32%"
                  paddingAngle={3}
                  label
                >
                  {estadosData.map(
                    (entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Prioridad comercial"
            subtitle="Distribución por mesa"
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={prioridadData}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#292c37"
                />

                <XAxis
                  dataKey="name"
                  stroke="#85899b"
                />

                <YAxis
                  allowDecimals={false}
                  stroke="#85899b"
                />

                <Tooltip />

                <Bar
                  dataKey="value"
                  name="Oportunidades"
                  fill="#e6197a"
                  radius={[
                    6, 6, 0, 0
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            wide
            title="Valor comercial por mesa de trabajo"
            subtitle="Venta estimada vs propuesta vs cerrado"
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={mesasData}
                margin={{
                  top: 10,
                  right: 20,
                  left: 5,
                  bottom: 10,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#292c37"
                />

                <XAxis
                  dataKey="equipo"
                  stroke="#85899b"
                />

                <YAxis
                  tickFormatter={(v) =>
                    `${Math.round(
                      v / 1000000
                    )}M`
                  }
                  stroke="#85899b"
                />

                <Tooltip
                  formatter={(value) =>
                    money(value)
                  }
                />

                <Legend />

                <Bar
                  dataKey="venta"
                  name="Venta estimada"
                  fill="#8b5cf6"
                  radius={[
                    6, 6, 0, 0
                  ]}
                />

                <Bar
                  dataKey="propuesta"
                  name="Valor propuesta"
                  fill="#2e9cf0"
                  radius={[
                    6, 6, 0, 0
                  ]}
                />

                <Bar
                  dataKey="cerrado"
                  name="Cerrado"
                  fill="#22c55e"
                  radius={[
                    6, 6, 0, 0
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Top ejecutivos por valor de propuesta"
            subtitle="Primeros 15 ejecutivos"
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={ejecutivosData}
                layout="vertical"
                margin={{
                  left: 20,
                  right: 10,
                  top: 5,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#292c37"
                />

                <XAxis
                  type="number"
                  tickFormatter={(v) =>
                    `${Math.round(
                      v / 1000000
                    )}M`
                  }
                  stroke="#85899b"
                />

                <YAxis
                  type="category"
                  dataKey="ejecutivo"
                  width={125}
                  stroke="#85899b"
                  tick={{
                    fontSize: 8,
                  }}
                />

                <Tooltip
                  formatter={(value) =>
                    money(value)
                  }
                />

                <Bar
                  dataKey="propuesta"
                  name="Propuesta"
                  fill="#e6197a"
                  radius={[
                    0, 6, 6, 0
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Valor por asesor de Innovación"
            subtitle="Propuestas gestionadas"
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={asesorData}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#292c37"
                />

                <XAxis
                  dataKey="asesor"
                  stroke="#85899b"
                  tick={{
                    fontSize: 8,
                  }}
                />

                <YAxis
                  tickFormatter={(v) =>
                    `${Math.round(
                      v / 1000000
                    )}M`
                  }
                  stroke="#85899b"
                />

                <Tooltip
                  formatter={(value) =>
                    money(value)
                  }
                />

                <Legend />

                <Bar
                  dataKey="valor"
                  name="Valor propuesta"
                  fill="#8b5cf6"
                  radius={[
                    6, 6, 0, 0
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            wide
            title="Evolución mensual del negocio"
            subtitle="Venta, propuestas y cierres"
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={mesesData}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#292c37"
                />

                <XAxis
                  dataKey="mes"
                  stroke="#85899b"
                />

                <YAxis
                  tickFormatter={(v) =>
                    `${Math.round(
                      v / 1000000
                    )}M`
                  }
                  stroke="#85899b"
                />

                <Tooltip
                  formatter={(value) =>
                    money(value)
                  }
                />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="venta"
                  name="Venta estimada"
                  stroke="#2e9cf0"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

                <Line
                  type="monotone"
                  dataKey="propuesta"
                  name="Valor propuesta"
                  stroke="#e6197a"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

                <Line
                  type="monotone"
                  dataKey="cerrado"
                  name="Cerrado"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>

        <InnovationTeam />

        <section className="table-card">
          <div className="table-heading">
            <div>
              <h3>
                Detalle de oportunidades
              </h3>

              <span>
                {number(
                  datosFiltrados.length
                )} resultados visibles · Haz clic
                sobre una fila para ver el detalle
              </span>
            </div>
          </div>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Mesa</th>
                  <th>Cuenta</th>
                  <th>Ejecutivo</th>
                  <th>Venta estimada</th>
                  <th>Propuesta</th>
                  <th>Cerrado</th>
                  <th>Estado</th>
                  <th>Prioridad</th>
                  <th>Asesor</th>
                  <th>Necesidad</th>
                  <th>Avance</th>
                </tr>
              </thead>

              <tbody>
                {datosFiltrados.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() =>
                      setRegistroSeleccionado(r)
                    }
                    className="clickable-row"
                  >
                    <td>
                      <span className="team-pill">
                        {r.EQUIPO}
                      </span>
                    </td>

                    <td>
                      <strong>
                        {r.CUENTA || "—"}
                      </strong>
                    </td>

                    <td>
                      {r[
                        "NOMBRE EJECUTIVO"
                      ] || "—"}
                    </td>

                    <td>
                      {money(
                        r["VENTA ESTIMADA"]
                      )}
                    </td>

                    <td>
                      {money(
                        r[
                          "VALOR DE LA PROPUESTA"
                        ]
                      )}
                    </td>

                    <td>
                      {r.ESTADO ===
                      "Cerrada"
                        ? money(
                            r[
                              "VALOR DE LA PROPUESTA"
                            ]
                          )
                        : "—"}
                    </td>

                    <td>
                      <span
                        className={`status-pill ${String(
                          r.ESTADO || ""
                        )
                          .toLowerCase()
                          .replace(
                            /\s+/g,
                            "-"
                          )}`}
                      >
                        {r.ESTADO || "—"}
                      </span>
                    </td>

                    <td>
                      {r.PRIORIDAD || "—"}
                    </td>

                    <td>
                      {r[
                        "ASESOR INNOVACION DIGITAL"
                      ] || "—"}
                    </td>

                    <td className="need-cell">
                      {r["NECESIDAD 1"] ||
                        "—"}
                    </td>

                    <td>
                      {number(
                        r[
                          "AVANCE PLAN 1"
                        ] || 0
                      )}
                      %
                    </td>
                  </tr>
                ))}

                {!datosFiltrados.length && (
                  <tr>
                    <td
                      colSpan="11"
                      className="empty-state"
                    >
                      No hay registros que
                      coincidan con los filtros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {registroSeleccionado && (
        <div
          className="modal-backdrop"
          onClick={() =>
            setRegistroSeleccionado(null)
          }
        >
          <div
            className="record-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="record-modal-header">
              <div>
                <span className="eyebrow">
                  DETALLE DEL REGISTRO #
                  {registroSeleccionado.id}
                </span>

                <h2>
                  {registroSeleccionado.CUENTA ||
                    "Sin cuenta"}
                </h2>

                <p>
                  {registroSeleccionado[
                    "NOMBRE EJECUTIVO"
                  ] || "Sin ejecutivo"}{" "}
                  ·{" "}
                  {registroSeleccionado.EQUIPO ||
                    "Sin equipo"}
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setRegistroSeleccionado(null)
                }
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <div className="record-grid">
              {[
                [
                  "Mesa de trabajo",
                  registroSeleccionado.EQUIPO,
                ],
                [
                  "Ejecutivo",
                  registroSeleccionado[
                    "NOMBRE EJECUTIVO"
                  ],
                ],
                [
                  "Cuenta",
                  registroSeleccionado.CUENTA,
                ],
                [
                  "Venta estimada",
                  money(
                    registroSeleccionado[
                      "VENTA ESTIMADA"
                    ]
                  ),
                ],
                [
                  "Valor de propuesta",
                  money(
                    registroSeleccionado[
                      "VALOR DE LA PROPUESTA"
                    ]
                  ),
                ],
                [
                  "Valor cerrado",
                  registroSeleccionado.ESTADO ===
                  "Cerrada"
                    ? money(
                        registroSeleccionado[
                          "VALOR DE LA PROPUESTA"
                        ]
                      )
                    : "—",
                ],
                [
                  "Estado",
                  registroSeleccionado.ESTADO,
                ],
                [
                  "Prioridad",
                  registroSeleccionado.PRIORIDAD,
                ],
                [
                  "Responsable",
                  registroSeleccionado.RESPONSABLE,
                ],
                [
                  "Mes",
                  registroSeleccionado.MES,
                ],
                [
                  "Fecha solicitud",
                  registroSeleccionado[
                    "FECHA SOLICITUD"
                  ],
                ],
                [
                  "Fecha entrega",
                  registroSeleccionado[
                    "FECHA DE ENTREGA"
                  ],
                ],
                [
                  "Asesor Innovación Digital",
                  registroSeleccionado[
                    "ASESOR INNOVACION DIGITAL"
                  ],
                ],
                [
                  "Oportunidad",
                  registroSeleccionado.OPORTUNIDAD,
                ],
                [
                  "Link / presentación",
                  registroSeleccionado[
                    "LINK DE PRESENTACION"
                  ],
                ],
              ].map(([label, value]) => (
                <div
                  className="record-field"
                  key={label}
                >
                  <span>{label}</span>
                  <strong>
                    {value || "—"}
                  </strong>
                </div>
              ))}
            </div>

            <div className="record-section">
              <h3>Necesidades</h3>

              <p>
                <b>Necesidad 1:</b>{" "}
                {registroSeleccionado[
                  "NECESIDAD 1"
                ] || "—"}
              </p>

              <p>
                <b>Necesidad 2:</b>{" "}
                {registroSeleccionado[
                  "NECESIDAD 2"
                ] || "—"}
              </p>

              <p>
                <b>Necesidad 3:</b>{" "}
                {registroSeleccionado[
                  "NECESIDAD 3"
                ] || "—"}
              </p>
            </div>

            <div className="record-section">
              <h3>
                Plan de acción y avances
              </h3>

              <p>
                <b>
                  Plan 1 (
                  {number(
                    registroSeleccionado[
                      "AVANCE PLAN 1"
                    ] || 0
                  )}
                  %):
                </b>{" "}
                {registroSeleccionado[
                  "PLAN DE ACCIÓN 1"
                ] || "—"}
              </p>

              <p>
                <b>
                  Plan 2 (
                  {number(
                    registroSeleccionado[
                      "AVANCE PLAN 2"
                    ] || 0
                  )}
                  %):
                </b>{" "}
                {registroSeleccionado[
                  "PLAN DE ACCIÓN 2"
                ] || "—"}
              </p>

              <p>
                <b>
                  Plan 3 (
                  {number(
                    registroSeleccionado[
                      "AVANCE PLAN 3"
                    ] || 0
                  )}
                  %):
                </b>{" "}
                {registroSeleccionado[
                  "PLAN DE ACCIÓN 3"
                ] || "—"}
              </p>
            </div>
          </div>
        </div>
      )}

      <footer className="dashboard-footer">
        Prisa Media · Área de Innovación Digital ·
        Dashboard comercial
      </footer>
    </div>
  );
}

export default App;
