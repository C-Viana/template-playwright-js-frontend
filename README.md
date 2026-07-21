# Template JS Playwright
**Projeto de estudo que implementa um framework de automação de testes frontend do site "The Internet"**

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/-playwright-%232EAD33?style=for-the-badge&logo=playwright&logoColor=white)


## TECNOLOGIAS
- **Playwright**
- **Typescript**
- **NodeJS**
- **ESLint**
- **Prettier**
- **Axios**
- **Tesseract**


## ARQUITETURA GERAL

1. **Tópicos**:
- Interações essenciais: buttons, links, checkboxes e inputs manuseados de diferentes maneiras
- Interações complexas: selects, drag and drop, scrolls, frames e mudança de janelas tratados com êxito
- Dialogs: interações com alerts, confirms e prompts
- Autenticação: basic auth com variáveis de ambiente
- OCR: leitura de texto em elemento canvas com Tesseract
- Arquivos: download de arquivos com Axios
- Estrutura: separação de responsabilidades e modularidade com classes de teste, pages, utilities, etc


## ESTRUTURA DO PROJETO
```
template-js-playwright
│           
├───src
│     ├── data
│     ├── pages
│     │     ├── ABTestingVariationPage.ts
│     │     ├── BrokenImagesPage.ts
│     │     └── ...
│     └── utils
│           ├── HttpServices.ts
│           ├── ScreenshotHelper.ts
│           └── ...
│───test-results
│     ├── SC01-TC01/
│     │     ├── 1-Evidência.png
│     │     └── ...
│     └── SC01-TC02/
│           ├── 1-Evidência.png
│           └── ...
└───tests
     ├── tc01-the-internet-abtesting.spec.ts
     ├── tc02-the-internet-broken-images.spec.ts
     └── ...
```

### PRÉ-REQUISITOS
- NodeJS v24.16.0+
- Arquivo .env ou variáveis de ambiente conforme arquivo .env.example


### EXECUÇÃO LOCAL
1. Prepare os arquivos _.env_ ou configure as variáveis de sistema conforme o modelo apresentado no arquivo de referência _.env.example_
2. Abra a pasta raíz do projeto no terminal
3. Execute os comandos abaixo conforme a necessidade
    - Executar todos os testes com navegador em segundo plano: ```npm run test```
    - Executar todos os testes com navegador em primeiro plano: ```npm run test:headed```
    - Abrir o relatório de resultados dos testes executados: ```npm run report```


### LICENÇA
    Feito com ☕ e persistência por Carlos Eduardo de Souza Viana
    [LinkedIn](https://www.linkedin.com/in/carlos-eds-viana)