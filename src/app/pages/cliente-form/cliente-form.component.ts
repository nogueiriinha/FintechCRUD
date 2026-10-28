import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../model/cliente';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent implements OnInit {

  //Defino um objeto cliente vazio para armazenar os dados do formulário
  cliente: Cliente = {} as Cliente;
  private service = inject(ClienteService);
  private router = inject(Router);

  confirmarSenha: string = '';

  //Resgatar o ID do Cliente na alteração
  private route = inject(ActivatedRoute);
  clienteId:string | null = this.route.snapshot.paramMap.get('id');

  //Checar o se Há ID na URL para abrir editor
  ngOnInit(): void {
    if(this.clienteId){
      this.service.buscarPorId(this.clienteId).subscribe({
        next: (cliente)=>{this.cliente = cliente},
        error: ()=> alert("Cliente não encontrado.")
      })
    }
  }

  salvar() {

    if (this.cliente.senha !== this.confirmarSenha) {
      alert('As senhas não são iguais.');
      return;
    }

    if(this.clienteId){
      //modo de alteração
      this.service.editar(this.cliente).subscribe({
        next: (cliente)=> {
          this.cliente = cliente;
          this.router.navigate(["admin-clientes-listar"]);
        }
      })

    }else{
      //modo de inclusão
      this.service.incluir(this.cliente).subscribe({
        next: (cliente) => {
          this.cliente = cliente;
          alert(`Cliente ${this.cliente.nome} cadastrado com sucesso!`);
          this.router.navigate(['/admin-clientes-listar']);
        }
      });
    }

  }
}
