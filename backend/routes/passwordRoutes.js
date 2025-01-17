import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { Password } from '../models/passwordModel.js';
import { encrypt, decrypt } from '../utils/encryption.js';

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const { service, username, password } = req.body;
  const { userId } = req.user;
  
  try {
    const { iv, encryptedData } = encrypt(password);
    const newPassword = new Password({
      userId,
      service,
      username,
      iv,
      encryptedPassword: encryptedData,
    });


    await newPassword.save();
    res.status(201).json({ message: 'Password saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', verifyToken, async (req, res) => {
  const { userId } = req.user;

  try {
    const passwords = await Password.find({ userId });
    const decryptedPasswords = passwords.map((entry) => ({
      _id:entry._id,
      service: entry.service,
      username: entry.username,
      password: decrypt(entry.encryptedPassword, entry.iv),
    }));

    res.status(200).json(decryptedPasswords);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', verifyToken, async (req, res) => {
    const { id } = req.params; 
    const { userId } = req.user; 
    try {

    const passwordEntry = await Password.findOne({ _id: id, userId });

    if (!passwordEntry) {
        return res.status(404).json({ message: 'Password not found' });
    }

    res.status(200).json({
        service: passwordEntry.service,
        username: passwordEntry.username,
        password: decrypt(passwordEntry.encryptedPassword, passwordEntry.iv),
        createdAt: passwordEntry.createdAt,
        updatedAt: passwordEntry.updatedAt,
    });
    } catch (error) {
    res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;
    const { service, username, password } = req.body;

    try {
    const passwordEntry = await Password.findOne({ _id: id, userId });

    if (!passwordEntry) {
        return res.status(404).json({ message: 'Password not found' });
    }

    const { iv, encryptedData } = encrypt(password);

    passwordEntry.service = service || passwordEntry.service;
    passwordEntry.username = username || passwordEntry.username;
    passwordEntry.encryptedPassword = encryptedData;
    passwordEntry.iv = iv;

    await passwordEntry.save();

    res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
    res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;

    try {
    const passwordEntry = await Password.findOneAndDelete({ _id: id, userId });

    if (!passwordEntry) {
        return res.status(404).json({ message: 'Password not found' });
    }

    res.status(200).json({ message: 'Password deleted successfully' });
    } catch (error) {
    res.status(500).json({ message: 'Server error' });
    }
});

export default router;
