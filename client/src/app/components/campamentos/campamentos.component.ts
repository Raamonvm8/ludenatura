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
  precioPensionCompleta: number = 21;
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

  isDropdownOpen = false;
  selectedCourses: { [key: string]: boolean } = {}; 



  cursos = [
    { name: 'Otros', selected: false },
    { name: '1º Infantil', selected: false }, { name: '2º Infantil', selected: false }, { name: '3º Infantil', selected: false },
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
        {"title": "AULA DE LA NATURALEZA DE OSORIO", "image": "../../../assets/campamentos/osorio.jpg", "imageBack": "../../../assets/campamentos/ubi_osorio.png", "sitio": "Teror"},
        {"title": "CHIRA", "image": "../../../assets/campamentos/chira.jpg", "imageBack": "../../../assets/campamentos/ubi_chira.png", "sitio": "San Bartolomé de Tirajana"},
        {"title": "AULA DE LA NATURALEZA LAS TEDERAS", "image": "../../../assets/campamentos/tederas.jpg", "imageBack": "../../../assets/campamentos/ubi_LasTederas.png", "sitio": "Santa Lucía de Tirajana"},
        {"title": "AULA DE LA NATURALEZA LA PALMITA", "image": "../../../assets/campamentos/LaPalmita.png", "imageBack": "../../../assets/campamentos/ubi_LaPalmita.png", "sitio": "Agaete"},
        {"title": "FINCA BAILADERO", "image": "../../../assets/campamentos/ElBailadero.png", "imageBack": "../../../assets/campamentos/ubi_elBailadero.png", "sitio": "Telde"},
        {"title": "CORTIJO DE HUERTAS", "image": "../../../assets/campamentos/cortijoHuertas.jpg", "imageBack": "../../../assets/campamentos/ubi_deHuertas.png", "sitio": "Tejeda"}
    ]
    `;

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
      meriendas: ['no'],

      
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
    document.body.style.overflow = 'hidden'; // Para evitar el scroll detrás del modal
  }
  closeForm() {
    this.selectedLugar = null;
    document.body.style.overflow = ''; // Restaurar el scroll detrás del modal
    this.precioActividades = 28; this.precioAlojamiento =12; this.precioMerienda=0; this.precioPensionCompleta=21; this.precioTotal=0; this.precioActividadAcuatica=0; this.precioUltimoDia=0;
  }

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
        this.precioAlojamiento=this.precioAlojamiento*i;
        this.precioPensionCompleta=this.precioPensionCompleta*i;
        precioFinal += this.precioAlojamiento + this.precioPensionCompleta;
        if(this.reservaForm.value.actividadAcuatica === 'si'){
          this.precioActividadAcuatica += 18;
          precioFinal += this.precioActividadAcuatica;
        }
        if(this.reservaForm.value.meriendas === 'si'){
          this.precioMerienda += 2.60*i;
          precioFinal += this.precioMerienda;
        }
        if(this.reservaForm.value.comidaUltima === 'si'){
          this.precioUltimoDia += 9.50;
          precioFinal += this.precioUltimoDia;
        }
        if(i===1){
          precioFinal += this.precioActividades;
        }else if(i===2){
          this.precioActividades += 14;
          precioFinal += this.precioActividades;
        }else if(i===3){
          this.precioActividades += 14+15;
          precioFinal += this.precioActividades;
        }else if(i===4){
          this.precioActividades += 14+15+15;
          precioFinal += this.precioActividades;
        }
      }
    }

    this.igic = precioFinal*0.07;

    this.precioTotal = precioFinal + this.igic;


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










