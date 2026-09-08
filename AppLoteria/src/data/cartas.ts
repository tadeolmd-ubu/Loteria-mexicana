export interface Carta {
  id: string;
  nombre: string;
  imagen: any;
}

const c01 = require('../../assets/cartas/01-gallo.jpg');
const c02 = require('../../assets/cartas/02-diablito.jpg');
const c03 = require('../../assets/cartas/03-dama.jpg');
const c04 = require('../../assets/cartas/04-catrin.jpg');
const c05 = require('../../assets/cartas/05-paraguas.jpg');
const c06 = require('../../assets/cartas/06-sirena.jpg');
const c07 = require('../../assets/cartas/07-escalera.jpg');
const c08 = require('../../assets/cartas/08-botella.jpg');
const c09 = require('../../assets/cartas/09-barril.jpg');
const c10 = require('../../assets/cartas/10-arbol.jpg');
const c11 = require('../../assets/cartas/11-melon.jpg');
const c12 = require('../../assets/cartas/12-valiente.jpg');
const c13 = require('../../assets/cartas/13-gorrito.jpg');
const c14 = require('../../assets/cartas/14-muerte.jpg');
const c15 = require('../../assets/cartas/15-pera.jpg');
const c16 = require('../../assets/cartas/16-bandera.jpg');
const c17 = require('../../assets/cartas/17-bandolon.jpg');
const c18 = require('../../assets/cartas/18-violoncello.jpg');
const c19 = require('../../assets/cartas/19-garza.jpg');
const c20 = require('../../assets/cartas/20-pajaro.jpg');
const c21 = require('../../assets/cartas/21-mano.jpg');
const c22 = require('../../assets/cartas/22-bota.jpg');
const c23 = require('../../assets/cartas/23-luna.jpg');
const c24 = require('../../assets/cartas/24-cotorro.jpg');
const c25 = require('../../assets/cartas/25-borracho.jpg');
const c26 = require('../../assets/cartas/26-negrito.jpg');
const c27 = require('../../assets/cartas/27-corazon.jpg');
const c28 = require('../../assets/cartas/28-sandia.jpg');
const c29 = require('../../assets/cartas/29-tambor.jpg');
const c30 = require('../../assets/cartas/30-camaron.jpg');
const c31 = require('../../assets/cartas/31-jaras.jpg');
const c32 = require('../../assets/cartas/32-musico.jpg');
const c33 = require('../../assets/cartas/33-arana.jpg');
const c34 = require('../../assets/cartas/34-soldado.jpg');
const c35 = require('../../assets/cartas/35-estrella.jpg');
const c36 = require('../../assets/cartas/36-cazo.jpg');
const c37 = require('../../assets/cartas/37-mundo.jpg');
const c38 = require('../../assets/cartas/38-apache.jpg');
const c39 = require('../../assets/cartas/39-nopal.jpg');
const c40 = require('../../assets/cartas/40-alacran.jpg');
const c41 = require('../../assets/cartas/41-rosa.jpg');
const c42 = require('../../assets/cartas/42-calavera.jpg');
const c43 = require('../../assets/cartas/43-campana.jpg');
const c44 = require('../../assets/cartas/44-cantarito.jpg');
const c45 = require('../../assets/cartas/45-venado.jpg');
const c46 = require('../../assets/cartas/46-sol.jpg');
const c47 = require('../../assets/cartas/47-corona.jpg');
const c48 = require('../../assets/cartas/48-chalupa.jpg');
const c49 = require('../../assets/cartas/49-pino.jpg');
const c50 = require('../../assets/cartas/50-pescado.jpg');
const c51 = require('../../assets/cartas/51-palma.jpg');
const c52 = require('../../assets/cartas/52-maceta.jpg');
const c53 = require('../../assets/cartas/53-arpa.jpg');
const c54 = require('../../assets/cartas/54-rana.jpg');

export const CARTAS: Carta[] = [
  { id: '01-gallo', nombre: 'El Gallo', imagen: c01 },
  { id: '02-diablito', nombre: 'El Diablito', imagen: c02 },
  { id: '03-dama', nombre: 'La Dama', imagen: c03 },
  { id: '04-catrin', nombre: 'El Catrín', imagen: c04 },
  { id: '05-paraguas', nombre: 'El Paraguas', imagen: c05 },
  { id: '06-sirena', nombre: 'La Sirena', imagen: c06 },
  { id: '07-escalera', nombre: 'La Escalera', imagen: c07 },
  { id: '08-botella', nombre: 'La Botella', imagen: c08 },
  { id: '09-barril', nombre: 'El Barril', imagen: c09 },
  { id: '10-arbol', nombre: 'El Árbol', imagen: c10 },
  { id: '11-melon', nombre: 'El Melón', imagen: c11 },
  { id: '12-valiente', nombre: 'El Valiente', imagen: c12 },
  { id: '13-gorrito', nombre: 'El Gorrito', imagen: c13 },
  { id: '14-muerte', nombre: 'La Muerte', imagen: c14 },
  { id: '15-pera', nombre: 'La Pera', imagen: c15 },
  { id: '16-bandera', nombre: 'La Bandera', imagen: c16 },
  { id: '17-bandolon', nombre: 'El Bandolón', imagen: c17 },
  { id: '18-violoncello', nombre: 'El Violoncello', imagen: c18 },
  { id: '19-garza', nombre: 'La Garza', imagen: c19 },
  { id: '20-pajaro', nombre: 'El Pájaro', imagen: c20 },
  { id: '21-mano', nombre: 'La Mano', imagen: c21 },
  { id: '22-bota', nombre: 'La Bota', imagen: c22 },
  { id: '23-luna', nombre: 'La Luna', imagen: c23 },
  { id: '24-cotorro', nombre: 'El Cotorro', imagen: c24 },
  { id: '25-borracho', nombre: 'El Borracho', imagen: c25 },
  { id: '26-negrito', nombre: 'El Negrito', imagen: c26 },
  { id: '27-corazon', nombre: 'El Corazón', imagen: c27 },
  { id: '28-sandia', nombre: 'La Sandía', imagen: c28 },
  { id: '29-tambor', nombre: 'El Tambor', imagen: c29 },
  { id: '30-camaron', nombre: 'El Camarón', imagen: c30 },
  { id: '31-jaras', nombre: 'Las Jaras', imagen: c31 },
  { id: '32-musico', nombre: 'El Músico', imagen: c32 },
  { id: '33-arana', nombre: 'La Araña', imagen: c33 },
  { id: '34-soldado', nombre: 'El Soldado', imagen: c34 },
  { id: '35-estrella', nombre: 'La Estrella', imagen: c35 },
  { id: '36-cazo', nombre: 'El Cazo', imagen: c36 },
  { id: '37-mundo', nombre: 'El Mundo', imagen: c37 },
  { id: '38-apache', nombre: 'El Apache', imagen: c38 },
  { id: '39-nopal', nombre: 'El Nopal', imagen: c39 },
  { id: '40-alacran', nombre: 'El Alacrán', imagen: c40 },
  { id: '41-rosa', nombre: 'La Rosa', imagen: c41 },
  { id: '42-calavera', nombre: 'La Calavera', imagen: c42 },
  { id: '43-campana', nombre: 'La Campana', imagen: c43 },
  { id: '44-cantarito', nombre: 'El Cantarito', imagen: c44 },
  { id: '45-venado', nombre: 'El Venado', imagen: c45 },
  { id: '46-sol', nombre: 'El Sol', imagen: c46 },
  { id: '47-corona', nombre: 'La Corona', imagen: c47 },
  { id: '48-chalupa', nombre: 'La Chalupa', imagen: c48 },
  { id: '49-pino', nombre: 'El Pino', imagen: c49 },
  { id: '50-pescado', nombre: 'El Pescado', imagen: c50 },
  { id: '51-palma', nombre: 'La Palma', imagen: c51 },
  { id: '52-maceta', nombre: 'La Maceta', imagen: c52 },
  { id: '53-arpa', nombre: 'El Arpa', imagen: c53 },
  { id: '54-rana', nombre: 'La Rana', imagen: c54 },
];