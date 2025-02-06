import { seedUsers } from './user-seeds.js';
import { seedTickets } from './ticket-seeds.js';
import { sequelize } from '../models/index.js';
import { User } from '../models/user.js';
import { Ticket } from '../models/ticket.js';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    const existingUsers = await User.count();
    const existingTickets = await Ticket.count();

    if (existingUsers > 0 || existingTickets > 0) {
      console.log(`'\n----- DATABASE ALREADY SEEDED. SKIPPING... -----\n'`);
      process.exit(0);
    }

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    
    await seedTickets();
    console.log('\n----- TICKETS SEEDED -----\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
