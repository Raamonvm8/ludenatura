import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, NgModule } from '@angular/core';
import { FondoComponent } from "../fondo/fondo.component";
import { MapaComponent } from "./mapa/mapa.component";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import * as emailjs from 'emailjs-com';


@Component({
  selector: 'app-campamentos',
  standalone: true,
  imports: [NgFor, NgIf, FondoComponent, MapaComponent, FormsModule, NgClass, ReactiveFormsModule],
  templateUrl: './campamentos.component.html',
  styleUrl: './campamentos.component.css'
})
export class CampamentosComponent implements OnInit{
  title: string = "CAMPAMENTOS";
  selectedLugar: any = null;
  numeroDias: number = 0;
  numeroNoches: number =0;
  numProfes: number = 0;
  numAlumnos: number = 0;

  submitted = false; 
  selectedCoursesString: string = '';

  formData = { name: '', email: '', movil: '', pax: '', profesores: '', fechaIni: '', fechaFin: '', colegio: '', cursos: '', observations: ''};
  fechaInicio: string = '';
  fechaFin: string = '';

  diaActual: string = '';
  mesActual: string = '';
  anoActual: string = '';
  fecha: string = '';

  reservaForm!: FormGroup ;

  //precios
  //Alojamiento por noche
  precioAlojamiento: number = 12;
  //Desayuno, almuerzo y cena
  precioPensionCompleta: number = 0;
  //Almuerzo ultimo dia 9.50€
  precioUltimoDia: number = 0;
  //Merienda 2.60€
  precioMerienda: number = 0;
  //Precio Actividades, cada día más se suman 15€
  precioActividades: number = 28;
  //Precio actividad extra 18€
  precioActividadAcuatica: number = 0;
  //Igic
  igic: number = 0;
  //Precio total
  precioTotal: number = 0;

  //Datos individuales
  precio_Pension: number = 0;
  siHayEdades: string = '';

  isDropdownOpen = false;
  selectedCourses: { [key: string]: boolean } = {}; 

  private cursosMenores6Primaria = [
    '1º Infantil (3 años)', '2º Infantil (4 años)', '3º Infantil (5 años)',
    '1º Primaria', '2º Primaria', '3º Primaria', '4º Primaria', '5º Primaria', '6º Primaria'
  ];
  
  private cursosMayores1ESO = [
    '1º ESO', '2º ESO', '3º ESO', '4º ESO', '1º Bachillerato', '2º Bachillerato'
  ];

  cursos = [
    { name: 'Otros', selected: false },
    { name: '1º Infantil (3 años)', selected: false }, { name: '2º Infantil (4 años)', selected: false }, { name: '3º Infantil (5 años)', selected: false },
    { name: '1º Primaria', selected: false },{ name: '2º Primaria', selected: false },{ name: '3º Primaria', selected: false },{ name: '4º Primaria', selected: false },{ name: '5º Primaria', selected: false },{ name: '6º Primaria', selected: false },
    { name: '1º ESO', selected: false }, { name: '2º ESO', selected: false }, { name: '3º ESO', selected: false }, { name: '4º ESO', selected: false },
    { name: '1º Bachillerato', selected: false }, { name: '2º Bachillerato', selected: false }
  ];

  photos1: string[] = ["../../../assets/campamentos/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg", 
    "../../../assets/campamentos/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg", 
    "../../../assets/campamentos/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
  ];

  
  photos2: string[] = ["../../../assets/campamentos/campamentoImg1.jpg", 
    "../../../assets/campamentos/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg", 
    "../../../assets/homepage-images/actividades.jpg",
    "../../../assets/campamentos/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
  ];

  lugares: { title: string, image: string, imageBack: string, sitio: string }[] = [];
  currentActivity: string = '';
  currentIndex: number = 0;
  @ViewChild('activityImg') activityImg!: ElementRef;

  constructor(private elRef: ElementRef, private renderer: Renderer2,private fb: FormBuilder) {

  }

  ngOnInit() {
    this.currentActivity = this.photos2[0];
    this.startImageRotation();
    this.updateCurrentDate();

    const campamentos = `
    [
        {"title": "ALBERGUE LA HOYILLA", "image": "../../../assets/homepage-images/albergue_lahoyilla.jpg", "imageBack": "../../../assets/campamentos/ubi_LaHoyilla.png", "sitio": "La Aldea de San Nicolás"},
        {"title": "ALBERGUE DE JUNCALILLO", "image": "../../../assets/campamentos/Juncalillo.jpg", "imageBack": "../../../assets/campamentos/ubi_Juncalillo.png", "sitio": "Gáldar"},
        {"title": "CHIRA", "image": "../../../assets/campamentos/chira.jpg", "imageBack": "../../../assets/campamentos/ubi_chira.png", "sitio": "San Bartolomé de Tirajana"},
        {"title": "AULA DE LA NATURALEZA LAS TEDERAS", "image": "../../../assets/campamentos/tederas.jpg", "imageBack": "../../../assets/campamentos/ubi_LasTederas.png", "sitio": "Santa Lucía de Tirajana"},
        {"title": "AULA DE LA NATURALEZA LA PALMITA", "image": "../../../assets/campamentos/LaPalmita.png", "imageBack": "../../../assets/campamentos/ubi_LaPalmita.png", "sitio": "Agaete"},
        {"title": "FINCA BAILADERO", "image": "../../../assets/campamentos/ElBailadero.png", "imageBack": "../../../assets/campamentos/ubi_elBailadero.png", "sitio": "Telde"}
    ]
    `;
    //{"title": "AULA DE LA NATURALEZA DE OSORIO", "image": "../../../assets/campamentos/osorio.jpg", "imageBack": "../../../assets/campamentos/ubi_osorio.png", "sitio": "Teror"},

    //{"title": "CORTIJO DE HUERTAS", "image": "../../../assets/campamentos/cortijoHuertas.jpg", "imageBack": "../../../assets/campamentos/ubi_deHuertas.png", "sitio": "Tejeda"}


    this.lugares = JSON.parse(campamentos);

    this.reservaForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      movil: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), this.onlyNumbersValidator()]],
      colegio: ['', Validators.required],
      cursos: ['', Validators.required],
      pax: ['', [Validators.required, Validators.min(1)]],
      profesores: ['', [Validators.required, Validators.min(1)]],
      fechaIni: ['', Validators.required],
      fechaFin: ['', Validators.required],
      observations: [''],
      actividadAcuatica:['no'],
      comidaUltima: ['no'],
      meriendas: ['si'],

      
    }, { validator: this.dateValidator() });
    

   

    
  }

  //Validadores
  onlyNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const isValid = /^\d+$/.test(value); // Expresión regular para verificar si solo contiene dígitos
  
      return !isValid ? { 'onlyNumbers': { value: control.value } } : null;
    };
  }
  dateValidator(): ValidatorFn {
    return (group: AbstractControl): { [key: string]: any } | null => {
      const formGroup = group as FormGroup;
      const fechaIni = formGroup.get('fechaIni')?.value;
      const fechaFin = formGroup.get('fechaFin')?.value;

      if (fechaIni && fechaFin) {
        const isInvalid = new Date(fechaFin) < new Date(fechaIni);
        return isInvalid ? { 'invalidDateRange': true } : null;
      }
      return null;
    };
  }

  //Imagenes albergues con mapa detrás
  startImageRotation() {
    setInterval(() => {
      this.fadeOutImage();
      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.photos2.length;
        this.currentActivity = this.photos2[this.currentIndex];
        this.fadeInImage();
      }, 1000); 
    }, 3000); 
  }
  fadeOutImage() {
    this.renderer.setStyle(this.activityImg.nativeElement, 'opacity', '0');
  }
  fadeInImage() {
    this.renderer.setStyle(this.activityImg.nativeElement, 'opacity', '1');
  }

  //Abrir cerrar formulario
  openForm(lugar: any) {
    this.selectedLugar = lugar;
    document.body.style.overflow = 'hidden'; 
  }
  closeForm() {
    this.selectedLugar = null;
    document.body.style.overflow = ''; 
    this.precioActividades = 28; this.precioAlojamiento =12; this.precioMerienda=0; this.precioPensionCompleta=0; this.precioTotal=0; this.precioActividadAcuatica=0; this.precioUltimoDia=0; this.precio_Pension=0; this.siHayEdades = '';
  }

  //Formula para calcular dias de estancia
  calcularDias(){
    if (this.formData.fechaIni && this.formData.fechaFin) {
      const fechaIni = new Date(this.formData.fechaIni);
      const fechaFin = new Date(this.formData.fechaFin);

      const resta = fechaFin.getTime() - fechaIni.getTime();

      this.numeroDias = resta / (1000 * 3600 * 24) +1;
      this.numeroNoches = this.numeroDias - 1;
      
    } else {
      this.numeroDias = 0;
    }

    console.log(this.numeroDias);
  }

  //Cambiar el formato fecha
  formatDate(fecha: string){
    const dividir = fecha.split('-');
    if(dividir.length===3){
      const [anio, mes, dia] = dividir;
      return `${dia}/${mes}/${anio}`;
    }
    return fecha;
  }

  updateCurrentDate() {
    const { dia, mes, ano } = this.getCurrentDate();
    this.diaActual = dia;
    this.mesActual = mes;
    this.anoActual = ano;
  }

  //Obtener fecha actual
  getCurrentDate(): { dia: string, mes: string, ano: string } {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };

    const dia = today.toLocaleDateString('es-ES', { day: '2-digit' });
    const mes = today.toLocaleDateString('es-ES', { month: '2-digit' });
    const ano = today.toLocaleDateString('es-ES', { year: 'numeric' });

    return { dia, mes, ano };
  }

  //Recoger opciones de cursos
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  onCursoChange(curso: any, event: Event) {
    // Asegúrate de que el target sea un HTMLInputElement
    const input = event.target as HTMLInputElement;
    curso.selected = input.checked; // Actualiza la selección
  
    this.updateSelectedCourses(); // Actualiza la cadena de cursos seleccionados
  }

  updateSelectedCourses() {
    // Filtrar cursos seleccionados y unirlos en una cadena separada por comas
    const selectedCourses = this.cursos
      .filter(curso => curso.selected)
      .map(curso => curso.name)
      .join(', ');

    this.selectedCoursesString = selectedCourses;

    // Actualizar el valor en el formulario
    this.reservaForm.get('cursos')?.setValue(this.selectedCoursesString);
  }

  calculoPrecios(){
    let precioFinal = 0;
    for(let i=1; i<5; i++){
      if(this.numeroNoches===i){
        //ALOJAMIENTO LO MISMO PARA TODOS?
        this.precioAlojamiento=this.precioAlojamiento*i;
        this.precioMerienda += 2.60*i;
        if(this.reservaForm.value.actividadAcuatica === 'si'){
          this.precioActividadAcuatica += 18;
        }
        if(i===1){

        }else if(i===2){
          this.precioActividades += 14;
        }else if(i===3){
          this.precioActividades += 14+15;
        }else if(i===4){
          this.precioActividades += 14+15+15;
        }
        if(this.selectedLugar.title === 'ALBERGUE LA HOYILLA'){
          this.precio_Pension=21;
          this.precioPensionCompleta=21*i;
          if(this.reservaForm.value.comidaUltima === 'si'){
            this.precioUltimoDia += 9.50;
          }
        }else if(this.selectedLugar.title === 'AULA DE LA NATURALEZA DE OSORIO'){
          

        }else if(this.selectedLugar.title === 'AULA DE LA NATURALEZA LA PALMITA'){
          const { menoresDe6Primaria, mayoresDe1ESO } = this.checkCursoRange();
          
          if (menoresDe6Primaria) {
            this.siHayEdades = ' (menores de 12 años)';
            this.precio_Pension=20;
            if(this.reservaForm.value.comidaUltima === 'si' && this.selectedCourses){
              this.precioUltimoDia += 10.75;
              
            }
            this.precioPensionCompleta = 20*i;
          }else if (mayoresDe1ESO) {
            this.siHayEdades = ' (mayores de 12 años)';
            this.precio_Pension = 23.20;
            if(this.reservaForm.value.comidaUltima === 'si' && this.selectedCourses){
              this.precioUltimoDia += 13;
            }
            this.precioPensionCompleta = 23.20*i;
          }
        }else {
          this.precio_Pension = 21;
          if(this.reservaForm.value.comidaUltima === 'si'){
            this.precioUltimoDia += 9.50;
          }
        }
      }
    }
    precioFinal += this.precioAlojamiento + this.precioPensionCompleta + this.precioMerienda+ this.precioActividades + this.precioUltimoDia + this.precioActividadAcuatica;
    this.igic = precioFinal*0.07;
    this.precioTotal = precioFinal + this.igic;
}

checkCursoRange(): { menoresDe6Primaria: boolean, mayoresDe1ESO: boolean } {
  const selectedCourses = this.cursos.filter(curso => curso.selected).map(curso => curso.name);

  const menoresDe6Primaria = selectedCourses.some(curso => this.cursosMenores6Primaria.includes(curso));
  const mayoresDe1ESO = selectedCourses.some(curso => this.cursosMayores1ESO.includes(curso));

  return { menoresDe6Primaria, mayoresDe1ESO };
}

  pulsador(): void {
    if (confirm(`Después de enviar el formulario, nos pondremos en contacto con usted para enviarle presupuestos y poder confirmar la reserva. ¡Muchas gracias!`)) {
      
    }else{
      this.closeForm();
    } 

  }

  onSubmit(): void {
    this.submitted = true; // Marca el formulario como enviado
    
    
    if (this.formData.observations === ''){
      this.formData.observations = 'Ninguno';
    }
    if (this.reservaForm.invalid) {
      return;
    }
    this.formData.cursos = this.selectedCoursesString;
    if (confirm(`¿CONFIRMAS LA RESERVA EN ${this.selectedLugar.title}?`)) {
      this.sendEmail(); 
      this.closeForm();
    } else {
      console.log('Formulario no enviado');
    }
    

  
  }



  isFieldInvalid(field: string): boolean {
    const control = this.reservaForm.get(field);
    return control ? control.invalid && (this.submitted) : false;
  }


  sendEmail() {
    this.calculoPrecios();
    
    const templateParams = {
      from_name: this.formData.name,
      from_albergue: this.selectedLugar.title,
      from_email: this.formData.email,
      from_movil: this.formData.movil,
      from_pax: this.formData.pax,
      from_profesores: this.formData.profesores,
      from_colegio: this.formData.colegio,
      from_cursos: this.formData.cursos,
      fecha_ini: this.formatDate(this.formData.fechaIni),
      fecha_fin: this.formatDate(this.formData.fechaFin),
      from_observations: this.formData.observations,
      dia_actual: this.diaActual,
      mes_actual: this.mesActual,
      ano_actual: this.anoActual,
      from_dias: this.numeroDias,
      from_noches: this.numeroNoches,
      precio_alojamiento: this.precioAlojamiento.toFixed(2),
      precio_pension: this.precioPensionCompleta.toFixed(2),
      precio_meriendas: this.precioMerienda.toFixed(2),
      precio_actividades: this.precioActividades.toFixed(2),
      precio_igic: this.igic.toFixed(2),
      precio_total: this.precioTotal.toFixed(2),
      value_actividadAcuatica: this.reservaForm.value.actividadAcuatica,
      value_meriendas: this.reservaForm.value.meriendas,
      value_ultimaComida: this.reservaForm.value.comidaUltima,
      from_precioUltimaComida: this.precioUltimoDia,
      from_precioPension: this.precio_Pension,
      from_edades: this.siHayEdades,
    };

    //service ID lude: 'service_qgvt02b' ravama: 'service_wstz9vg', template ID, API key
    emailjs.send('service_wstz9vg', 'template_tan4lri', templateParams, '3KBSltLvruiFMO5Cq')
      .then(response => {
        alert('Formulario enviado con éxito');
      }, error => {
        console.error('Error al enviar el formulario', error);
      });

  }

}










