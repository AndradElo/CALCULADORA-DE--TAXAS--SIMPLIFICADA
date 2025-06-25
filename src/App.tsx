import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, CreditCard, PiggyBank, Info } from 'lucide-react';

function App() {
  const [faturamentoMensal, setFaturamentoMensal] = useState('');
  const [volumePix, setVolumePix] = useState('');
  const [ticketMedio, setTicketMedio] = useState('');
  const [resultados, setResultados] = useState(null);

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = (parseInt(numericValue) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    return formattedValue;
  };

  const parseInputValue = (value: string) => {
    return parseFloat(value.replace(/\D/g, '')) / 100;
  };

  const handleInputChange = (setter: (value: string) => void, value: string) => {
    const formatted = formatCurrency(value);
    setter(formatted);
  };

  const calcularTaxas = () => {
    const faturamento = parseInputValue(faturamentoMensal);
    const volume = parseInputValue(volumePix);
    const ticket = parseInputValue(ticketMedio);

    if (!faturamento || !volume || !ticket) return;

    // Lógica de cálculo das taxas baseada em padrões do mercado brasileiro
    const percentualPix = (volume / faturamento) * 100;
    const numeroTransacoes = volume / ticket;

    // Taxa de entrada (recebimento PIX) - varia conforme volume
    let taxaEntrada = 0.99; // 0.99% base
    if (volume > 100000) taxaEntrada = 0.79; // Desconto para alto volume
    if (volume > 500000) taxaEntrada = 0.69; // Desconto maior para volume muito alto

    // Taxa de saída (transferência PIX) - geralmente fixa
    const taxaSaida = 0.20; // R$ 0,20 por transação

    // Cálculos dos valores
    const custoEntrada = (volume * taxaEntrada) / 100;
    const custoSaida = numeroTransacoes * taxaSaida;
    const custoTotal = custoEntrada + custoSaida;
    const custoPercentual = (custoTotal / volume) * 100;

    setResultados({
      faturamento,
      volume,
      ticket,
      percentualPix,
      numeroTransacoes,
      taxaEntrada,
      taxaSaida,
      custoEntrada,
      custoSaida,
      custoTotal,
      custoPercentual
    });
  };

  useEffect(() => {
    if (faturamentoMensal && volumePix && ticketMedio) {
      calcularTaxas();
    }
  }, [faturamentoMensal, volumePix, ticketMedio]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full mr-4">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">
              Calculadora de Taxas PIX
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Informe seus dados financeiros e descubra as taxas de entrada e saída 
            para transações PIX do seu negócio
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário de Entrada */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <DollarSign className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Dados do Negócio
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Faturamento Mensal
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={faturamentoMensal}
                    onChange={(e) => handleInputChange(setFaturamentoMensal, e.target.value)}
                    placeholder="R$ 0,00"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg font-medium"
                  />
                  <TrendingUp className="absolute right-3 top-3 w-6 h-6 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volume de Transações PIX
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={volumePix}
                    onChange={(e) => handleInputChange(setVolumePix, e.target.value)}
                    placeholder="R$ 0,00"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg font-medium"
                  />
                  <CreditCard className="absolute right-3 top-3 w-6 h-6 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ticket Médio
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={ticketMedio}
                    onChange={(e) => handleInputChange(setTicketMedio, e.target.value)}
                    placeholder="R$ 0,00"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg font-medium"
                  />
                  <PiggyBank className="absolute right-3 top-3 w-6 h-6 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Como funciona:</p>
                  <ul className="space-y-1 text-blue-700">
                    <li>• Taxa de entrada: percentual sobre o valor recebido</li>
                    <li>• Taxa de saída: valor fixo por transação enviada</li>
                    <li>• Descontos aplicados conforme volume transacionado</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <Calculator className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Resultados das Taxas
              </h2>
            </div>

            {resultados ? (
              <div className="space-y-6">
                {/* Resumo Geral */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">
                    Resumo Financeiro
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-green-600">PIX do Faturamento</p>
                      <p className="text-xl font-bold text-green-800">
                        {resultados.percentualPix.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-green-600">Nº Transações</p>
                      <p className="text-xl font-bold text-green-800">
                        {Math.round(resultados.numeroTransacoes).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Taxas Aplicadas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Taxa de Entrada</h4>
                    <p className="text-2xl font-bold text-blue-900">
                      {resultados.taxaEntrada.toFixed(2)}%
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      Sobre valores recebidos
                    </p>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-2">Taxa de Saída</h4>
                    <p className="text-2xl font-bold text-orange-900">
                      R$ {resultados.taxaSaida.toFixed(2)}
                    </p>
                    <p className="text-sm text-orange-600 mt-1">
                      Por transação enviada
                    </p>
                  </div>
                </div>

                {/* Custos Detalhados */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Custos Mensais Estimados
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Custo de Entrada:</span>
                      <span className="font-semibold text-gray-800">
                        {resultados.custoEntrada.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Custo de Saída:</span>
                      <span className="font-semibold text-gray-800">
                        {resultados.custoSaida.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center py-2">
                        <span className="font-semibold text-gray-800">Custo Total:</span>
                        <span className="text-xl font-bold text-red-600">
                          {resultados.custoTotal.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Percentual do volume PIX:
                        </span>
                        <span className="text-sm font-medium text-red-600">
                          {resultados.custoPercentual.toFixed(3)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Calculator className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">
                  Preencha todos os campos para ver os resultados
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">
            * Os valores apresentados são estimativas baseadas em padrões do mercado brasileiro.
            <br />
            Consulte seu provedor de pagamentos para taxas exatas.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;