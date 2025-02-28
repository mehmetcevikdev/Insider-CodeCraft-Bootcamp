collatzLength = (n, memori) => {
  let originalN = n;
  let count = 0;
  while (n !== 1 && !memori[n]) {
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      n = 3 * n + 1;
    }
    count++;
  }

  memori[originalN] = count + (memori[n] || 0);
  return memori[originalN];
};

longestCollatzSequence = (limit) => {
  let maxLength = 0;
  let startingNumber = 0;
  let memori = {};

  for (let i = 1; i < limit; i++) {
    let length = collatzLength(i, memori);
    if (length > maxLength) {
      maxLength = length;
      startingNumber = i;
    }
  }

  return startingNumber;
};

console.log(longestCollatzSequence(1000000));

//? aşağıda bulunan kodu yazdıktan sonra internette araştırma yaptım ve memori ile çıkan sonuçların tekrardan hesaplanmamasını sağlayan yöntemi buldum ve projeyi geliştirdim

/* collatzSequenceLength = (n) => {
  let count = 0;
  while (n !== 1) {
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      n = 3 * n + 1;
    }
    count++;
  }
  return count;
};

longestCollatzSequence = (limit) => {
  let maxLength = 0;
  let startingNumber = 0;

  for (let i = 1; i < limit; i++) {
    let length = collatzSequenceLength(i);
    if (length > maxLength) {
      maxLength = length;
      startingNumber = i;
    }
  }

  return startingNumber;
};

console.log(longestCollatzSequence(1000000)); */
