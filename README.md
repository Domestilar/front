#Domestilar Crediário - FRONT

###Instalação:
Clonar projeto:
```
git clone https://github.com/amapa-piscinas/dashboard
```
Instalar dependências:
```
cd dashboard 
yarn install
```
Alterar variáveis de ambiente no arquivo .env na raiz do projeto.
```
BASE_URL_API=http://domestilar.api - > Link da API.
```
Gerar arquivos para produção
```
yarn generate
```
Apontar o domínio da aplicação para o diretório dashboard/dist