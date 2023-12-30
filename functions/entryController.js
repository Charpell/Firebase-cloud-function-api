const { db } = require('./config/firebase')
const addEntry = async (req, res) => {
  const { title, content } = req.body

  try {
    const newEntry = await db.collection('dent').add({
      title,
      content,
    })
    res.status(201).json({
      message: `Entry ${newEntry.id} created successfully`,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

const getAllEntries = async (req, res) => {
  try {
    const entries = await db.collection('dent').get()
    const entriesArray = []
    entries.forEach((doc) => {
      entriesArray.push({
        id: doc.id,
        ...doc.data(),
      })
    })
    res.status(200).json(entriesArray)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

const getEntry = async (req, res) => {
  try {
    const entry = await db.collection('dent').doc(req.params.id).get()
    if (!entry.exists) {
      res.status(404).json({
        message: `Entry ${req.params.id} not found`,
      })
    }
    res.status(200).json({
      id: entry.id,
      ...entry.data(),
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

const updateEntry = async (req, res) => {
  try {
    const entry = await db.collection('dent').doc(req.params.id).get()
    if (!entry.exists) {
      res.status(404).json({
        message: `Entry ${req.params.id} not found`,
      })
    }

    const currentData = (await entry.data()) || {}

    const entryData = {
      title: req.body.title || currentData.title,
      content: req.body.content || currentData.content,
    }
    await db.collection('dent').doc(req.params.id).update(entryData)
    res.status(200).json({
      message: `Entry ${req.params.id} updated successfully`,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

const deleteEntry = async (req, res) => {
  try {
    await db.collection('dent').doc(req.params.id).delete()
    res.status(200).json({
      message: `Entry ${req.params.id} deleted successfully`,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}



module.exports = {
  addEntry,
  getAllEntries,
  getEntry,
  updateEntry,
  deleteEntry,
}
