/**
 * Zonas mencionadas en el guion del Terremoto (aproximadas).
 */
export const ZONES = [
  // ──────────────── ZONAS MUY AFECTADAS (Nivel Alto) ────────────────
  {
    id: 'z-limonar',
    phenomenon: 'terremoto',
    level: 'alto',
    name: 'El Limonar / Torres de Limonar',
    area: 'Comuna 17 - Sur de Cali',
    description: 'Varias edificaciones colapsaron, incluyendo un edificio de cuatro pisos. Cientos de personas evacuadas; intensas labores de rescate con Cruz Roja y Bomberos.',
    meetingPoints: ['pe-ingenio', 'pe-pascual'],
    coords: [
      [3.3980, -76.5380], [3.3940, -76.5380], [3.3900, -76.5340],
      [3.3950, -76.5300], [3.3980, -76.5380]
    ],
  },
  {
    id: 'z-alameda',
    phenomenon: 'terremoto',
    level: 'alto',
    name: 'La Alameda',
    area: 'Comuna 3 / 9',
    description: 'Se desplomó un edificio frente a la galería del barrio, atrapando a personas en los escombros. Rescates activos lograron sacar a varias personas con vida.',
    meetingPoints: ['pe-pascual'],
    coords: [
      [3.4420, -76.5360], [3.4380, -76.5340], [3.4350, -76.5380],
      [3.4400, -76.5400], [3.4420, -76.5360]
    ],
  },
  {
    id: 'z-sanfernando',
    phenomenon: 'terremoto',
    level: 'alto',
    name: 'San Fernando',
    area: 'Comuna 19',
    description: 'Frente al edificio Los Colores, una edificación colapsó dejando grandes cantidades de escombros. Hogar de María y Nicolás antes del sismo.',
    meetingPoints: ['pe-pascual', 'pe-perro'],
    coords: [
      [3.4350, -76.5450], [3.4280, -76.5420], [3.4250, -76.5480],
      [3.4320, -76.5510], [3.4350, -76.5450]
    ],
  },
  {
    id: 'z-cuartolegua',
    phenomenon: 'terremoto',
    level: 'alto',
    name: 'Cuarto de Legua',
    area: 'Comuna 19 - Cerca de la USC',
    description: 'Cerca a la Universidad Santiago de Cali y la Plaza de Toros. Un edificio residencial de 5 a 7 pisos colapsó, dejando personas atrapadas.',
    meetingPoints: ['pe-pueblo'],
    coords: [
      [3.4150, -76.5520], [3.4100, -76.5500], [3.4080, -76.5560],
      [3.4120, -76.5580], [3.4150, -76.5520]
    ],
  },
  {
    id: 'z-huv',
    phenomenon: 'terremoto',
    level: 'alto',
    name: 'Hospital Universitario del Valle (HUV)',
    area: 'Calle 5 - San Fernando',
    description: 'El gran bloque se desmoronó por la mitad. El "Buziraco" se aferró al área de neonatos dejando a los bebés encerrados bajo escombros mientras el personal luchaba por salvar pacientes.',
    meetingPoints: ['pe-pascual'],
    coords: [
      [3.4320, -76.5450], [3.4300, -76.5440], [3.4290, -76.5460],
      [3.4310, -76.5470], [3.4320, -76.5450]
    ],
  },
  {
    id: 'z-laluna',
    phenomenon: 'terremoto',
    level: 'alto',
    name: 'La Luna (Junín)',
    area: 'Comuna 9',
    description: 'Colapsó parcialmente un edificio donde funcionaba la discoteca Saturday, lugar donde Juan iba a celebrar su despedida de soltero.',
    meetingPoints: ['pe-pascual'],
    coords: [
      [3.4390, -76.5290], [3.4350, -76.5260], [3.4320, -76.5300],
      [3.4360, -76.5330], [3.4390, -76.5290]
    ],
  },
  {
    id: 'z-autopista39',
    phenomenon: 'terremoto',
    level: 'alto',
    name: 'Autopista Sur con Calle 39',
    area: 'Sur',
    description: 'Colapso parcial de un edificio de apartahoteles. Intensas operaciones de rescate en curso.',
    meetingPoints: ['pe-pascual', 'pe-pueblo'],
    coords: [
      [3.4280, -76.5350], [3.4250, -76.5320], [3.4220, -76.5360],
      [3.4250, -76.5390], [3.4280, -76.5350]
    ],
  },

  // ──────────────── ZONAS PREPARADAS / MENOS AFECTADAS (Nivel Bajo/Medio) ────────────────
  {
    id: 'z-caney',
    phenomenon: 'terremoto',
    level: 'bajo',
    name: 'El Caney',
    area: 'Comuna 17',
    description: 'Barrio con edificios de bases modernas para protección antisismos (post 1988). Una zona familiar que resistió mejor el impacto.',
    meetingPoints: ['pe-ingenio'],
    coords: [
      [3.3850, -76.5200], [3.3750, -76.5150], [3.3720, -76.5220],
      [3.3820, -76.5270], [3.3850, -76.5200]
    ],
  },
  {
    id: 'z-bochalema',
    phenomenon: 'terremoto',
    level: 'bajo',
    name: 'Bochalema / Ciudad Pacífica',
    area: 'Expansión Sur',
    description: 'Zona residencial relativamente nueva y preparada para casos de emergencia. Luis planea alojarse en sus alrededores.',
    meetingPoints: ['pe-uao'],
    coords: [
      [3.3550, -76.5150], [3.3450, -76.5100], [3.3400, -76.5200],
      [3.3500, -76.5250], [3.3550, -76.5150]
    ],
  },
  {
    id: 'z-torrecali',
    phenomenon: 'terremoto',
    level: 'medio',
    name: 'Torre de Cali',
    area: 'Norte / Centro',
    description: 'Edificio emblemático. Luis reside aquí y había preparado su mochila de emergencias tras un sismo reciente.',
    meetingPoints: ['pe-caicedo'],
    coords: [
      [3.4580, -76.5310], [3.4560, -76.5300], [3.4550, -76.5330],
      [3.4570, -76.5340], [3.4580, -76.5310]
    ],
  },
]

export const zonesByPhenomenon = (phenomenonId) => ZONES.filter((z) => z.phenomenon === phenomenonId)
