export default class ValidarCpf {
  constructor(element) {
    this.element = element;
  }
  clear(cpf) {
    return cpf.replace(/\D/g, '');
  }
  build(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }
  format(cpf) {
    const clearCpf = this.clear(cpf);
    return this.build(clearCpf);
  }
  valid(cpf) {
    const matchCpf = cpf.match(/(?:\d{3}[-.\s]?){3}\d{2}/g);
    return (matchCpf && matchCpf[0] === cpf);
  }
  validOnChange(cpfElement) {
    if (this.valid(cpfElement.value)) {
      cpfElement.value = this.format(cpfElement.value);
      cpfElement.classList.add('valid');
      cpfElement.classList.remove('erro');
      cpfElement.nextElementSibling.classList.remove('active');
    } else {
      cpfElement.classList.add('erro');
      cpfElement.classList.remove('valid');
      cpfElement.nextElementSibling.classList.add('active');
    }
  }
  addEvent() {
    this.element.addEventListener('change', () => {
      this.validOnChange(this.element);
    })
  }
  addSpanError() {
    const elementError = document.createElement('span');
    elementError.classList.add('text-error');
    elementError.innerText = 'CPF inválido';
    // console.log(this.element.parentElement); // Form
    // console.log(this.element.nextElementSibling); // label email
    this.element.parentElement.insertBefore(elementError, this.element.nextElementSibling);
  }
  init() {
    this.addEvent();
    this.addSpanError();
    return this;
  }
}

