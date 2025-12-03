package weektwo

// Week 2 - Day 1 == DAY 8
class DayOne {
    fun partOne(list: List<String>): Int {
        val rowList = list.toRowsList()
        val columnsList = list.toColumnsList()

        return getTotalVisible(rowList, columnsList)
    }

    fun partTwo(list: List<String>): Int {
        val rowList = list.toRowsList()
        val columnsList = list.toColumnsList()

        return getOptimalScenicScore(rowList, columnsList)
    }

    private fun getTotalVisible(rowList: List<List<Int>>, columnList: List<List<Int>>): Int {
        return (rowList.indices).toList().map { rowIndex ->
            (columnList.indices).toList().map { columnIndex ->
                if (rowIndex == 0 || rowIndex == rowList.size - 1) return@map 1
                if (columnIndex == 0 || columnIndex == columnList.size - 1) return@map 1

                val isVisibleRow = isVisible(columnIndex, rowList[rowIndex])
                val isVisibleColumn = isVisible(rowIndex, columnList[columnIndex])
                if (isVisibleRow || isVisibleColumn) 1 else 0
            }
        }.flatten().sum()
    }

    private fun isVisible(index: Int, list: List<Int>): Boolean {
        val value = list[index]
        val maxLeft = list.subList(0, index).maxOf { it }
        val maxRight = list.subList(index + 1, list.size).maxOf { it }

        return value > maxLeft || value > maxRight
    }

    private fun getOptimalScenicScore(rowList: List<List<Int>>, columnList: List<List<Int>>): Int {
        return (rowList.indices).toList().map { rowIndex ->
            (columnList.indices).toList().map { columnIndex ->
                if (rowIndex == 0 || rowIndex == rowList.size - 1) return@map 1
                if (columnIndex == 0 || columnIndex == columnList.size - 1) return@map 1

                val currentValue = rowList[rowIndex][columnIndex]
                val leftScore = getViewLength(currentValue, rowList[rowIndex].subList(0, columnIndex).reversed())
                val rightScore = getViewLength(currentValue, rowList[rowIndex].subList(columnIndex + 1, rowList.size))
                val topScore = getViewLength(currentValue, columnList[columnIndex].subList(0, rowIndex).reversed())
                val bottomScore = getViewLength(currentValue, columnList[columnIndex].subList(rowIndex + 1, columnList.size))

                leftScore * rightScore * topScore * bottomScore
            }
        }.flatten().maxOf { it }

    }

    private fun getViewLength(height: Int, list: List<Int>): Int {
        val new = mutableListOf<Int>()
        list.forEachIndexed { index, it ->
            new.add(index, it)
            if (height <= it) return new.size
        }
        return new.size
    }

    private fun List<String>.toRowsList(): List<List<Int>> {
        return this.map { row -> row.map { it.code - 48 } }
    }

    private fun List<String>.toColumnsList(): List<List<Int>> {
        val initialList = this.map { row -> (row.indices).toList().map { row[it] } }
        val new = (0 until this.size).map { rowIndex ->
            (0 until initialList[0].size).toList().map { columnIndex -> initialList[columnIndex][rowIndex] }
        }
        return new.map { column -> column.map { it.code - 48 } }
    }
}
