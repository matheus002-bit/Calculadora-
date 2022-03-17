
      (function() {
          // Wait until the window is loaded to start the calculator
          window.onload = function() {
              // obter elemento do formulario 
              var form = document.getElementById('sc-form');
      
              document.getElementById('sc-calculate').onclick = function(e) {
                  // impedir o envio do formulario sem preenchimento 
                  e.preventDefault();
      
                  // obtendo elementos 
                  var inputPopulation = document.getElementById('sc-input-population');
                  var inputError = document.getElementById('sc-input-error');
                  var inputConfidence = document.getElementById('sc-input-confidence');
                  var inputResponse = document.getElementById('sc-input-response');
                  var result = document.getElementById('sc-result');
                  var resultTarget = document.getElementById('sc-result-target');
      
                  // calculartaanho da amostra 
                  var sampleSize = calculateSampleSize(parseInt(inputError.value), parseInt(inputConfidence.value), parseInt(inputPopulation.value), parseInt(inputResponse.value));
      
                  // mostrar resultado no html 
                  resultTarget.innerHTML = sampleSize;
      
                  // mostrar resultado 
                  result.style.display = 'block';
              };
          };
      
          
          var probCriticalNormal = function(P){
              var Y, Pr, Real1, Real2, HOLD;
              var I;
              var PN = [0, 
                  -0.322232431088, -1.0, -0.342242088547, -0.0204231210245, -0.453642210148E-4
              ];
              var QN = [0, 
                  0.0993484626060,
                  0.588581570495,
                  0.531103462366,
                  0.103537752850,
                  0.38560700634E-2
              ];
              Pr = 0.5 - P / 2; 
              if (Pr <= 1.0E-8) HOLD = 6;
              else {
                  if (Pr == 0.5) HOLD = 0;
                  else {
                      Y = Math.sqrt(Math.log(1.0 / (Pr * Pr)));
                      Real1 = PN[5];
                      Real2 = QN[5];
                      for (I = 4; I >= 1; I--) {
                          Real1 = Real1 * Y + PN[I];
                          Real2 = Real2 * Y + QN[I];
                      }
                      HOLD = Y + Real1 / Real2;
                  } 
              }
              return HOLD;
          };
      
          // função calculadora 
          var calculateSampleSize = function(margin, confidence, population, response) {
              var pcn = probCriticalNormal(confidence / 100.0);
              var d1 = pcn * pcn * response * (100.0 - response);
              var d2 = (population - 1.0) * (margin * margin) + d1;
      
              if (d2 > 0.0)
                  return Math.ceil(population * d1 / d2);
      
              return 0.0;
          };
      })();
      