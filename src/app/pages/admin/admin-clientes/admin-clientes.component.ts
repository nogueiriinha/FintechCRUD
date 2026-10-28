import { Component, inject, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../model/cliente';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-clientes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-clientes.component.html',
  styleUrl: './admin-clientes.component.css'
})
export class AdminClientesComponent implements OnInit {
  
  private service = inject(ClienteService);

  listaClientes:Cliente[] = [];

  ngOnInit():void{
    this.service.listar().subscribe({
      //após receber a lista de clientes do serviço, atualiza a propriedade listaClientes
      next: (clientes) => {
        this.listaClientes = clientes;
      }
    });
  }

  editar(id: string) {
    console.log('Editar cliente:', id);
  }

  excluir(id: string) {

    if(id !== undefined && confirm('Deseja realmente excluir o cliente?')) {
      this.service.excluir(id).subscribe({
        next: () => {
          //Recarregar a lista de clientes após a exclusão
          this.listaClientes = this.listaClientes.filter(cliente => cliente.id !== id);
        }
      }); 
    }
  }

}
