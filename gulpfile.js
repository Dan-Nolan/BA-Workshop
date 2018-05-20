const gulp = require('gulp');
const solc = require('solc');
const fs = require('fs');
const contractName = 'ChuckETHCheese';
const contractFileName = `${contractName}.sol`;

gulp.task('compile', function(done) {
  const input = fs.readFileSync(`./${contractFileName}`).toString();
  const output = solc.compile({ sources: { [contractFileName]: input} }, 1);
  if(output.errors) {
    console.log(output.errors);
    done();
  }
  else {
    const myContract = output.contracts[`${contractFileName}:${contractName}`];
    const abi = JSON.parse(myContract.interface);
    const bytecode = myContract.bytecode;
    const fileOutput = { abi, bytecode };
    fs.writeFile(`./${contractName}.json`, JSON.stringify(fileOutput, null, 4), done);
  }
})

gulp.task('watch', function() {
  return gulp.watch(`./${contractFileName}`, () => gulp.start('compile'));
})
