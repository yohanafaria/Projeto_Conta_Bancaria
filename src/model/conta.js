"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conta = void 0;
var Conta = /** @class */ (function () {
    function Conta(numero, agencia, tipo, titular, saldo) {
        this._numero = numero;
        this._agencia = agencia;
        this._tipo = tipo;
        this._titular = titular;
        this._saldo = saldo;
    }
    Object.defineProperty(Conta.prototype, "numero", {
        get: function () {
            return this._numero;
        },
        set: function (numero) {
            this._numero = numero;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Conta.prototype, "agencia", {
        get: function () {
            return this._agencia;
        },
        set: function (agencia) {
            this._agencia = agencia;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Conta.prototype, "tipo", {
        get: function () {
            return this._tipo;
        },
        set: function (tipo) {
            this._tipo = tipo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Conta.prototype, "titular", {
        get: function () {
            return this._titular;
        },
        set: function (titular) {
            this._titular = titular;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Conta.prototype, "saldo", {
        get: function () {
            return this._saldo;
        },
        set: function (saldo) {
            this._saldo = saldo;
        },
        enumerable: false,
        configurable: true
    });
    Conta.prototype.sacar = function (valor) {
        if (this._saldo < valor) {
            console.log("\n Saldo Insuficiente!");
            return false;
        }
        this._saldo = this._saldo - valor;
        return true;
    };
    Conta.prototype.depositar = function (valor) {
        this._saldo = this._saldo + valor;
    };
    Conta.prototype.visualizar = function () {
        var tipo = "";
        switch (this._tipo) {
            case 1:
                tipo = "Conta Corrente";
                break;
            case 2:
                tipo = "Conta Poupança";
                break;
        }
        console.log("\n\n*****************************************************");
        console.log("Dados da Conta:");
        console.log("*****************************************************");
        console.log("Numero da Conta: " + this._numero);
        console.log("Agência: " + this._agencia);
        console.log("Tipo da Conta: " + tipo);
        console.log("Titular: " + this._titular);
        console.log("Saldo: " + this._saldo.toFixed(2));
    };
    return Conta;
}());
exports.Conta = Conta;
