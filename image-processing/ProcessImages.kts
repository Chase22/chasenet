import java.awt.image.BufferedImage
import java.io.File
import java.io.FileFilter
import javax.imageio.ImageIO

val inputFolder = File("in")
val outputFolder = File("out")

outputFolder.listFiles().forEach { it.deleteRecursively() }

if (!inputFolder.exists()) {
    println("No input folder found")
    System.exit(0)
}

val files = inputFolder.listFiles(FileFilter { listOf("png", "jpg").contains(it.extension) })

files.forEach {
    println("Processing ${it.name}")
    val image = ImageIO.read(it)
    val x4 = image
    val x3 = resizeImage(image, 0.75f)
    val x2 = resizeImage(image, 0.5f)
    val x1 = resizeImage(image, 0.25f)

    val images = listOf(
        "4x" to it.nameWithoutExtension + "_4x.png",
        "3x" to it.nameWithoutExtension + "_3x.png",
        "2x" to it.nameWithoutExtension + "_2x.png",
        "1x" to it.nameWithoutExtension + "_1x.png",
    )

    val imageFolder = File(outputFolder, it.nameWithoutExtension).also { it.mkdir() }

    ImageIO.write(x4, "png", File(imageFolder, images[0].second))
    ImageIO.write(x3, "png", File(imageFolder, images[1].second))
    ImageIO.write(x2, "png", File(imageFolder, images[2].second))
    ImageIO.write(x1, "png", File(imageFolder, images[3].second))

    File(imageFolder, it.nameWithoutExtension + ".txt")
        .writeText(images.joinToString(separator = ",\n") { "images/${imageFolder.name}/${it.second} ${it.first}" })
}


fun resizeImage(image: BufferedImage, factor: Float): BufferedImage {
    val output = BufferedImage((image.width * factor).toInt(), (image.height * factor).toInt(), image.type)
    val graphics = output.createGraphics()
    graphics.drawImage(image, 0, 0, output.width, output.height, null)
    graphics.dispose()
    return output
}