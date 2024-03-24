const express = require("express");
const router = express.Router();
const Jobs = require("../model/jobModel");

router.get("/", (req, res) => {
  res.send("API Job mobile");
});

//get jobs
router.get("/get-list-jos", async (rq, rs) => {
  try {
    const data = await Jobs.find();

    rs.send(data);
  } catch (error) {
    console.log(error);
  }
});

// post job
router.post("/post-job", async (rq, rs) => {
  try {
    const data = rq.body;
    const newJobs = new Jobs({
      name: data.name,
      stdate: data.stdate,
      endate: data.endate,
      status: data.status,
      discriptions: data.discriptions,
    });
    const reslut = await newJobs.save();

    if (reslut) {
      rs.json({
        status: 200,
        messenger: "Create job successfully",
        data: reslut,
      });
    } else {
      rs.json({
        status: 400,
        messenger: "Erro",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//Delete job
router.delete("/delete-job-by-id/:id", async (rq, rs) => {
  try {
    const { id } = rq.params;
    const result = await Jobs.findByIdAndDelete(id);

    if (result) {
      rs.json({
        status: 200,
        messenger: "Delete job successfully",
        data: result,
      });
    } else {
      rs.json({
        status: 400,
        messenger: "ERRO",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// put job
router.put("/update-job-by-id/:id", async (rq, rs) => {
  try {
    const { id } = rq.params;
    const data = rq.body;

    const updateJob = await Jobs.findById(id);

    let reslut = null;
    if (updateJob) {
      updateJob.name = data.name ?? updateJob.name;
      updateJob.stdate = data.stdate ?? updateJob.stdate;
      updateJob.endate = data.endate ?? updateJob.endate;
      updateJob.status = data.status ?? updateJob.status;
      updateJob.discriptions = data.discriptions ?? updateJob.discriptions;

      reslut = await updateJob.save();
    }

    if (reslut) {
      rs.json({
        status: 200,
        messenger: "Update shoe successfully",
        data: reslut,
      });
    } else {
      rs.json({
        status: 400,
        messenger: "ERRO",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
