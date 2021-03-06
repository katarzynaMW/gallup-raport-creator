import { Component, OnInit, OnDestroy } from '@angular/core';
import { Talent } from '../talent';
import { Subscription } from 'rxjs/Subscription';
import { TalentService } from '../talent.service';
import html2pdf from 'html2pdf.js/dist/include/html2pdf.es';

@Component({
  selector: 'app-create-pdf',
  templateUrl: './create-pdf.component.html',
  styleUrls: ['./create-pdf.component.css']
})
export class CreatePdfComponent implements OnInit {
  talents: Talent[];
  talentsSubscription: Subscription;
  coachee: String;

  constructor( private talentService: TalentService ) {
    this.talentsSubscription = talentService.talentsUpdated$.subscribe( (talents) => {
      this.talents = talents;
    });
  }

  ngOnInit() {
  }

  createPdf() {
    const elementToPrint = document.getElementById('printMe');
    const elementsToExclude = document.getElementsByClassName('data-html2canvas-ignore');
    const filename = this.coachee ? `raport_${this.coachee.replace(/ /g,"_")}.pdf` : 'raport.pdf'
    html2pdf(elementToPrint, {
        margin:       1,
        filename:     filename,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
          dpi: 192, 
          letterRendering: true
        },
        jsPDF:        { unit: 'cm', format: 'letter', orientation: 'portrait' }
      });

  }

  ngOnDestroy() {
    this.talentsSubscription.unsubscribe();
  }
}
