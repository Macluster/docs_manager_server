import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';
import path from 'path';

const mimeTypes: { [key: string]: string } = {
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'gif': 'image/gif',
  'mp4': 'video/mp4',
  'mkv': 'video/x-matroska',
  // Add other MIME types as needed
};

export default async function showPhoto(req: NextApiRequest, res: NextApiResponse) {
  const fileName = req.query['file'] as string;

  if (!fileName) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.write("File name is required.");
    res.end();
    return;
  }

  const fileExtension = path.extname(fileName).slice(1).toLowerCase();
  const contentType = mimeTypes[fileExtension];

  if (!contentType) {
    res.writeHead(415, { "Content-Type": "text/plain" });
    res.write("Unsupported file type.");
    res.end();
    return;
  }

  const filePath = path.join("uploads", fileName);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("File not found.");
      res.end();
      return;
    }

    const range = req.headers.range;
    if (range) {
      const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
      const start = parseInt(startStr, 10);
      const end = endStr ? parseInt(endStr, 10) : stats.size - 1;

      if (start >= stats.size) {
        res.writeHead(416, { "Content-Range": `bytes */${stats.size}` });
        res.end();
        return;
      }

      const chunkSize = (end - start) + 1;
      const fileStream = fs.createReadStream(filePath, { start, end });

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${stats.size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": contentType
      });

      fileStream.pipe(res);
    } else {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.write("File not found.");
          res.end();
          return;
        }

        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      });
    }
  });
}

export const config = {
  api: {
    responseLimit: false,
  },
}
