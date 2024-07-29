import readlinesync = require("readline-sync");
import { colors } from "./src/util/Colors";
import { ContaCorrente } from './src/model/ContaCorrente';
import { ContaPoupanca } from './src/model/ContaPoupanca';
import { ContaController } from "./src/controller/ContaController";
import { read } from "fs";

export function main(){
    let contas: ContaController = new ContaController();

    let opcao, numero, agencia, tipo, saldo, limite, aniversario, valor, numeroDestino: number;
    let titular: string;
    const tipoContas = ['Conta Corrente', 'Conta Poupança'];
    
    const contacorrente: ContaCorrente = new ContaCorrente(2, 123, 1, "Mariana", 15000, 1000);
    contacorrente.visualizar();
    contacorrente.sacar(2000);
    contacorrente.visualizar();
    contacorrente.depositar(1000);
    contacorrente.visualizar();

    const contapoupanca: ContaPoupanca = new ContaPoupanca(3, 123, 2, "Victor", 1000, 10);
    contapoupanca.visualizar();
    contapoupanca.sacar(200);
    contapoupanca.visualizar();
    contapoupanca.depositar(1000);
    contapoupanca.visualizar();

    
    while (true){
        
        console.log(colors.bg.black, colors.fg.yellow,
            "*****************************************************");
        console.log("                                                     ");
        console.log("                BANCO DO BRAZIL COM Z                ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Criar Conta                          ");
        console.log("            2 - Listar todas as Contas               ");
        console.log("            3 - Buscar Conta por Numero              ");
        console.log("            4 - Atualizar Dados da Conta             ");
        console.log("            5 - Apagar Conta                         ");
        console.log("            6 - Sacar                                ");
        console.log("            7 - Depositar                            ");
        console.log("            8 - Transferir valores entre Contas      ");
        console.log("            9 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ",
             colors.reset);

        console.log("Entre com a opção desejada: ");
        opcao = readlinesync.questionInt("");

        if (opcao == 9) {
            console.log("\nBanco do Brazil com Z - O seu Futuro começa aqui!");
            sobre();
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log(colors.fg.whitestrong, 
                    "\n\nCriar Conta\n\n", colors.reset);
                
                console.log("Digite o numero da agencia: ");
                agencia = readlinesync.questionInt("");
                
                console.log("Digite o nome do titular da conta: ");
                titular = readlinesync.question("");

                console.log("Digite o tipo de conta");
                tipo = readlinesync.keyInSelect(tipoContas, "", {cancel: false}) +1;

                console.log("Digite o saldo da conta: R$");
                saldo = readlinesync.questionFloat("");

                switch(tipo){
                    case 1:
                        console.log("Digite o limite da conta: R$");
                        limite = readlinesync.questionFloat("");
                        contas.cadastrar(
                            new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, limite));
                        break;

                    case 2:
                        console.log("Digite o dia do aniversario da conta poupança: ");
                        aniversario = readlinesync.questionInt("");
                        contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario));
                        break; 
                    }

                keyPress()
                break;

            case 2:
                console.log(colors.fg.whitestrong, 
                    "\n\nListar todas as Contas\n\n", colors.reset);
                
                contas.listarTodas();

                keyPress()
                break;

            case 3:
                console.log(colors.fg.whitestrong, 
                    "\n\nConsultar dados da Conta - por número\n\n", colors.reset);
                
                console.log("Digite o numero da conta: ");
                numero = readlinesync.questionInt("");
                contas.procurarPorNumero(numero);

                keyPress()
                break;

            case 4:
                console.log(colors.fg.whitestrong, 
                    "\n\nAtualizar dados da Conta\n\n", colors.reset);
                   
                    console.log("Digite o número da Conta: ")
                    numero = readlinesync.questionInt("");
    
                    let conta = contas.buscarNoArray(numero);
    
                    if (conta != null) {
    
                        console.log('Digite o Número da Agência: ');
                        agencia = readlinesync.questionInt("");
    
                        console.log('Digite o Nome do Titular da Conta: ');
                        titular = readlinesync.question("");
    
                        console.log('Digite o Saldo da Conta: ');
                        saldo = readlinesync.questionFloat("");
    
                        tipo = conta.tipo;
    
                        switch (tipo) {
                            case 1:
                                console.log('Digite o Limite da Conta: R$');
                                limite = readlinesync.questionFloat("");
                                contas.atualizar(
                                    new ContaCorrente(limite, numero, agencia, tipo, titular, saldo));
                                                             
                                break;

                            case 2:
                                console.log('Digite o dia de Aniversário da Conta: ');
                                aniversario = readlinesync.questionInt("");
                                contas.atualizar(new ContaPoupanca(numero, agencia, tipo, titular, saldo, aniversario));

                                break;
                        }
    
                    } else {
                        console.log("\nA Conta número: " + numero + " não foi encontrada!", colors.reset);
                    }
    
                    keyPress()
                    break;

            case 5:
                console.log(colors.fg.whitestrong, 
                    "\n\nApagar uma Conta\n\n", colors.reset);
                console.log("Digite o numero da conta: ");
                numero = readlinesync.questionInt("");
                contas.deletar(numero);

                keyPress()
                break;

            case 6:
                console.log(colors.fg.whitestrong,
                    "\n\nSaque\n\n", colors.reset);

                console.log("Digite o número da Conta: ")
                numero = readlinesync.questionInt("");

                console.log("Digite o valor do saque: ")
                valor = readlinesync.questionFloat("");

                contas.sacar(numero, valor);

                keyPress();
                break;


            case 7:
                console.log(colors.fg.whitestrong,
                    "\n\nDepósito\n\n", colors.reset);

                console.log("Digite o número da Conta: ")
                numero = readlinesync.questionInt("");

                console.log("Digite o valor do depósito: ")
                valor = readlinesync.questionFloat("");

                contas.depositar(numero, valor);

                keyPress()
                break;

            case 8:
                console.log(colors.fg.whitestrong,
                    "\n\nTransferência entre Contas\n\n", colors.reset);

                console.log("Digite o número da Conta de Origem: ")
                numero = readlinesync.questionInt("");

                console.log("Digite o número da Conta de Destino: ")
                numeroDestino = readlinesync.questionInt("");

                console.log("Digite o valor do saque: ")
                valor = readlinesync.questionFloat("");

                contas.transferir(numero, numeroDestino, valor);

                keyPress()
                break;

            default:
                console.log(colors.fg.whitestrong, 
                    "\nOpção Inválida!\n", colors.reset);

                keyPress()
                break;
        }
    }

}

// Função com os dados da pessoa desenvolvedora

export function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: ");
    console.log("Yohana Faria - yohanafaria@icloud.com");
    console.log("github.com/yohanafaria");
    console.log("*****************************************************");
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}
main();
