import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../util/Colors";

export class ContaController implements ContaRepository {

    private listaContas: Array<Conta> = new Array<Conta>;
    numero: number = 0;

    procurarPorNumero(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if (buscaConta != null){
            buscaConta.visualizar();
        } else {
            console.log(colors.fg.red, "A conta numero: ", + numero + " não foi encontrada!", colors.reset);
        }


    }
    listarTodas(): void {
        for (let conta of this.listaContas){
            conta.visualizar();
        };
    }
    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(colors.fg.green, "\nA conta numero: " + conta.numero + " foi criada com sucesso!", colors.reset);
    }
    atualizar(conta: Conta): void {
        let buscaConta = this.buscarNoArray(conta.numero);

        if (buscaConta != null){
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log(colors.fg.green, "A conta " + conta.numero + " foi atualizada com sucesso", colors.reset);
        } else {
            console.log(colors.fg.green, "A conta " + conta.numero + " não foi encontrada", colors.reset);
        }
    }
    deletar(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if (buscaConta !== null) {
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            console.log("\nA Conta foi excluída!")
        } else
            console.log("\nA Conta não foi encontrada!");
    }
    public sacar(numero: number, valor: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if (buscaConta !== null) {
            if (buscaConta.sacar(valor) === true)
                console.log("\nO Saque foi efetuado com sucesso!")
        } else
            console.log("\nA Conta não foi encontrada!");
    }
    depositar(numero: number, valor: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if (buscaConta !== null) {
            buscaConta.depositar(valor);
            console.log("\nO Depósito foi efetuado com sucesso!")
        } else
            console.log("\nA Conta não foi encontrada!");
    }

    public transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        let ContaOrigem = this.buscarNoArray(numeroOrigem);
        let ContaDestino = this.buscarNoArray(numeroDestino);

        if (ContaOrigem !== null && ContaDestino !== null) {
            if (ContaOrigem.sacar(valor) === true){
                ContaDestino.depositar(valor);
                console.log("\nA Transfrência foi efetuada com sucesso!")
            }
        } else
            console.log("\nA Conta de Origem e/ou Destino não foram encontradas!");
    }
    public gerarNumero(): number{
        return ++ this.numero;
    }
    public buscarNoArray(numero: number): Conta | null {
        for (let conta of this.listaContas){
            if (conta.numero === numero)
                return conta;
        }
        return null;
    }


}