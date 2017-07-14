Conte um Conto Frontend v1.0.2
---

# Informações Gerais

## Processo de Desenvolvimento
``` bash
# Clone o repositório git@github.com:conteumconto/dashboard.git
git clone

# Para as dependencias
npm install

# Serve com hotreload em localhost:8080 para desenvolvimento
npm run dev

# Nova branch com a funcionalidade que o dev vai desenvolver. Ex: Professor_Store

git checkout -b Professor_Store

#Commit na sua feature funcionando
git add .
git commit -m 'professor store working'
git push origin Professor_Store

# Abra um pull request explicando sua funcionalidade e espere outro dev dar merge pra versão estavel.
# Caso queria continuar desenvolvendo enquanto espera o pull request ser fechado crie outra branch.
```
Caros amiguinhos desenvolvedores, deem muitos commits :3
De preferência um commit por mudança no arquivo(não precisa commitar igual ctrl+s tbm uehuehuehue)

Após ter desenvolvido a funcionalidade e ela ter sido aceita você pode subir pra produção

## Processo de Construção (Build)

``` bash
# Clone o repositório git@github.com:conteumconto/dashboard.git
git clone

# Para as dependencias
npm install

# Serve com hotreload em localhost:8080 para desenvolvimento
npm run dev

# build no codigo para produção
npm run build

#para dar deploy ex: Professor_Store
cd dist/
git add .
git commit -m 'Professor_Store'
git push origin master

# caso não funcione remova dist/ e de build denovo
cd ..
rm -rf dist/
```
A saída do comando ```npm run build``` gera um diretório ```dist/``` este diretório aponta pro repositório de deploy. 

Isso quer dizer que commits na master dentro do diretório ```dist/``` irão para produção, cuidado parça

[Repo deploy link](https://github.com/conteumconto/backend) 
