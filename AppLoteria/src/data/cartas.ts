export interface Carta {
  id: string;
  nombre: string;
  imagen: any;
}

const c01 = require('../../assets/cartas/01-gallo.png');
const c02 = require('../../assets/cartas/02-diablito.png');
const c03 = require('../../assets/cartas/03-dama.png');
const c04 = require('../../assets/cartas/04-catrin.png');
const c05 = require('../../assets/cartas/05-paraguas.png');
const c06 = require('../../assets/cartas/06-sirena.png');
const c07 = require('../../assets/cartas/07-escalera.png');
const c08 = require('../../assets/cartas/08-botella.png');
const c09 = require('../../assets/cartas/09-barril.png');
const c10 = require('../../assets/cartas/10-arbol.png');
const c11 = require('../../assets/cartas/11-melon.png');
const c12 = require('../../assets/cartas/12-valiente.png');
const c13 = require('../../assets/cartas/13-gorrito.png');
const c14 = require('../../assets/cartas/14-muerte.png');
const c15 = require('../../assets/cartas/15-pera.png');
const c16 = require('../../assets/cartas/16-bandera.png');
const c17 = require('../../assets/cartas/17-bandolon.png');
const c18 = require('../../assets/cartas/18-violoncello.png');
const c19 = require('../../assets/cartas/19-garza.png');
const c20 = require('../../assets/cartas/20-pajaro.png');
const c21 = require('../../assets/cartas/21-mano.png');
const c22 = require('../../assets/cartas/22-bota.png');
const c23 = require('../../assets/cartas/23-luna.png');
const c24 = require('../../assets/cartas/24-cotorro.png');
const c25 = require('../../assets/cartas/25-borracho.png');
const c26 = require('../../assets/cartas/26-negrito.png');
const c27 = require('../../assets/cartas/27-corazon.png');
const c28 = require('../../assets/cartas/28-sandia.png');
const c29 = require('../../assets/cartas/29-tambor.png');
const c30 = require('../../assets/cartas/30-camaron.png');
const c31 = require('../../assets/cartas/31-jaras.png');
const c32 = require('../../assets/cartas/32-musico.png');
const c33 = require('../../assets/cartas/33-arana.png');
const c34 = require('../../assets/cartas/34-soldado.png');
const c35 = require('../../assets/cartas/35-estrella.png');
const c36 = require('../../assets/cartas/36-cazo.png');
const c37 = require('../../assets/cartas/37-mundo.png');
const c38 = require('../../assets/cartas/38-apache.png');
const c39 = require('../../assets/cartas/39-nopal.png');
const c40 = require('../../assets/cartas/40-alacran.png');
const c41 = require('../../assets/cartas/41-rosa.png');
const c42 = require('../../assets/cartas/42-calavera.png');
const c43 = require('../../assets/cartas/43-campana.png');
const c44 = require('../../assets/cartas/44-cantarito.png');
const c45 = require('../../assets/cartas/45-venado.png');
const c46 = require('../../assets/cartas/46-sol.png');
const c47 = require('../../assets/cartas/47-corona.png');
const c48 = require('../../assets/cartas/48-chalupa.png');
const c49 = require('../../assets/cartas/49-pino.png');
const c50 = require('../../assets/cartas/50-pescado.png');
const c51 = require('../../assets/cartas/51-palma.png');
const c52 = require('../../assets/cartas/52-maceta.png');
const c53 = require('../../assets/cartas/53-arpa.png');
const c54 = require('../../assets/cartas/54-rana.png');

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