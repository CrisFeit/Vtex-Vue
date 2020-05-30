export default{
  self :  document.querySelector('.js--overlay'),
  open(){
    this.self.classList.replace('overlay--close','overlay--open');
  },
  close(){
    this.self.classList.replace('overlay--open','overlay--close');
  },
}