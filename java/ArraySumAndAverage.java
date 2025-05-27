import java.util.Scanner;
public class ArraySumAndAverage {
public static void main(String[] args) {
Scanner scanner = new Scanner(System.in);
System.out.print("Enter the number of elements: ");
int n = scanner.nextInt();
int[] numbers = new int[n];
int sum = 0;
System.out.println("Enter " + n + " numbers:");
for (int i = 0; i < n; i++) {
numbers[i] = scanner.nextInt();
sum += numbers[i];
}
double average = (double) sum / n;
System.out.println("Sum of the array elements: " + sum);
System.out.println("Average of the array elements: " + average);
scanner.close();
}
}
