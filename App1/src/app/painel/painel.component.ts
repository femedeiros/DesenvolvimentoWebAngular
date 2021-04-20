import { Component, OnInit } from '@angular/core';

import { Frase } from '../shared/frase.model'
import { FRASES } from './frase-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase: Frase
  public progresso: number = 0

  public tentativasIncorretas: number = 0

  constructor() {
    this.gerarFrase();
  }

  ngOnInit(): void {
  }

  public gerarFrase(): void {
    this.resposta = '';

    if (this.rodada >= this.frases.length) {
      this.rodada = 0;
      this.progresso = 0;
      this.tentativasIncorretas = 0;
    }

    //this.rodada = this.rodada < this.frases.length ? this.rodada : 0;
    this.rodadaFrase = this.frases[this.rodada]
    this.rodada++
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  public verificarResposta(): void {
    if (this.resposta.toLowerCase() == this.rodadaFrase.frasePtBr.toLowerCase()) {
      this.progresso += (100 / this.frases.length);
      console.log(this.progresso);
      this.gerarFrase();
    } else {
      this.tentativasIncorretas++;
    }
  }

}
