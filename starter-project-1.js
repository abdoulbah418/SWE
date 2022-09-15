exports.findAllSolutions = function(grid, dictionary) {
  let solutions = [];

  if (dictionary.length == 0) return solutions
  if (grid.length < 2) return solutions

  console.table(grid)
  console.log(dictionary)

  grid = grid.map(subGrid => subGrid.map(letter => letter.toLowerCase()))

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      let visited = new Array(grid.length).fill(false).map(() => new Array(grid.length).fill(false));
      let word = [];
      // console.log(`[] {${i+1} ${j+1}} Starting Position`)
      findWords(word, grid, dictionary, i, j, visited, solutions);
    }
  }

  solutions = Array.from(new Set(solutions))
  console.log(solutions)
  return solutions;
}

function findWords(word, grid, dictionary, i, j, visited, solutions) {
  const lookup_indices = [[-1, -1],[-1, 0],[-1, 1],[0, 1],[1, 1],[1, 0],[1, -1],[0, -1]];

  if (i < 0 || i >= grid.length || j < 0 || j >= grid.length) {
    // console.log(`[${word}] {${i} ${j}} Out of Bounds`)
    return;
  }

  if (visited[i][j] == true) {
    // console.log(`[${word}] {${i} ${j}} Already Visited ${grid[i][j]}`)
    return;
  }

  word += grid[i][j]
  // console.log(`[${word}] {${i} ${j}} Current Guess`)

  if (isPrefix(dictionary, word)) {
    visited[i][j] = true;
    console.log(`[${word}] {${i} ${j}} Prefix Found`)

    if (isWord(dictionary, word)) {
      console.log(`[${word}] {${i} ${j}} Word Found`)
      solutions.push(word);
    }

    // console.log(`[${word}] {${i} ${j}} Starting Recurvise Search`)
    for (let x = 0; x < lookup_indices.length; x++) {
      let deltaX = lookup_indices[x][0]
      let deltaY = lookup_indices[x][1]
      findWords(word, grid, dictionary, i + deltaX, j + deltaY, visited, solutions);
    }
  }

  
  visited[i][j] = false;
}

function isPrefix(dictionary, word) {
  for (let potentialWordMatch of dictionary) {
    if (potentialWordMatch.substr(0, word.length).toLowerCase() == word.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function isWord(dictionary, word) {
  for (let potentialWordMatch of dictionary) {
    if (potentialWordMatch.toLowerCase() == word.toLowerCase() && word.length >= 3) {
      return true;
    }
  }
  return false;
}
