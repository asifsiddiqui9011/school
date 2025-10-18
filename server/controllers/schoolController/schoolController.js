import db from '../../config/db.js';

export const addSchool = async (req, res) => {
  const { name, address, city, state, contact, email, image } = req.body;

  if (!name || !address || !city || !state || !contact || !email) {
    return res.status(400).json({ error: 'All fields except image are required.' });
  }

  const query = `
    INSERT INTO school (name, address, city, state, contact, image, email)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await db.query(query, [
      name,
      address,
      city,
      state,
      contact,
      image,
      email,
    ]);

    res.status(201).json({
      message: 'School added successfully',
      schoolId: result.insertId,
    });
  } catch (err) {
    console.error('❌ Error inserting school:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
};

/**
 * Fetch all schools from the database
 * Returns: name, address, city, image
 */
export const getSchools = async (req, res) => {
  const query = 'SELECT * FROM school';

  try {
    const [results] = await db.query(query);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching schools:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
};

export const deleteSchool = async (req, res) => {
  const schoolId = req.params.id;
  console.log(schoolId,'scholid ')

  if (!schoolId) {
    return res.status(400).json({ error: 'School ID is required' });
  }

  const query = 'DELETE FROM school WHERE id = ?';

  try {
    const [result] = await db.query(query, [schoolId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'School not found' });
    }

    res.status(200).json({ message: 'School deleted successfully' });
  } catch (err) {
    console.error('Error deleting school:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
};

export const updateSchool = async (req, res) => {
  const schoolId = req.params.id;
  const { name, address, city, state, contact, email, image } = req.body;

  if (!schoolId) {
    return res.status(400).json({ error: 'School ID is required' });
  }

  const fields = [];
  const values = [];

  if (name !== undefined) {
    fields.push('name = ?');
    values.push(name);
  }
  if (address !== undefined) {
    fields.push('address = ?');
    values.push(address);
  }
  if (city !== undefined) {
    fields.push('city = ?');
    values.push(city);
  }
  if (state !== undefined) {
    fields.push('state = ?');
    values.push(state);
  }
  if (contact !== undefined) {
    fields.push('contact = ?');
    values.push(contact);
  }
  if (email !== undefined) {
    fields.push('email = ?');
    values.push(email);
  }
  if (image !== undefined) {
    fields.push('image = ?');
    values.push(image);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: 'At least one field is required to update.' });
  }

  const query = `UPDATE school SET ${fields.join(', ')} WHERE id = ?`;
  values.push(schoolId);

  try {
    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'School not found' });
    }

    res.status(200).json({ message: 'School updated successfully' });
  } catch (err) {
    console.error('Error updating school:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
};