class Elemento
{
  siguiente = null;
  valor = null;
 
  constructor(value) {
    this.valor = valor;
  }
}
class ListaEnlazada
{
  primero = null;
  ultimo = null;
 
  agregar = (valor) => {
 
    const elemento = new Elemento(valor);
 
    if (!this.primero) {
      this.primero = elemento;
      this.ultimo = elemento;
      return;
    }
 
    this.ultimo.next = item;
    this.ultimo = item;
  }
  numElementos = () => {

    let contador = 0;
    let elemento = this.primero;
 
    if (!elemento) return 0;
    else contador = 1;  
 
    while (elemento.siguiente) {
      elemento = elemento.siguiente;
      contador++;
    }
    return contador;
  }
  buscar = (valor) => {
 
    let contador = 0;
    let elemento = this.primero;
    
    if (!elemento) return null;
 
    while ((elemento = elemento.siguiente)) {
      if (elemento.valor === valor) {
        return elemento;
      }
    }
    return null;
  }
  insertar = (indice, valor) => {

    if (indice < 0 || indice > this.numElementos()) {
      return;
    }

    const nuevoElemento = new Elemento(valor);
    let elementoActual = this.primero;
    let anterior;

    if (indice === 0) {
      nuevoElemento.siguiente = elementoActual;
      this.primero = nuevoElemento;
      return;
    }
 
    let i = 0;
    while (i++ < indice) {
      elementoAnterior = elementoActual;
      elementoActual = elementoActual.siguiente;
    }
 
    nuevoElemento.siguiente = elementoActual;
    elementoAnterior.siguiente = nuevoElemento;
  }
}