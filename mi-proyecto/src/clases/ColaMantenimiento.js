export class ColaMantenimiento {
  constructor() {
    this.elementos = [];
    this.completados = [];
  }

  agregar(elemento) {
    this.elementos.push(elemento);
  }

  atender() {
    if (this.elementos.length === 0) {
      return;
    }
    let atendido = this.elementos.shift();
    this.completados.push(atendido);
  }

  limpiar() {
    this.completados = [];
  }
}