// Import necessay modules for interactive input and for hashing the password
import readline from 'readline'; 
import bcrypt from 'bcryptjs'; 

// Create an interface to read input from the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt the user for the password
rl.question('Enter the password to hash: ', (password) => {
  if (!password) {
    // If no password is entered, show an error message and close the interface
    console.log('Please provide a password to hash.');
    rl.close();
    return;
  }

  // Hash the password using bcrypt
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Output the hashed password
  console.log('Hashed Password:', hashedPassword);

  // Close the readline interface
  rl.close();
});
